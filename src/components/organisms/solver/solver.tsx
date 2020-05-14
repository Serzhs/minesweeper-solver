import React, {FC, useState, useEffect} from 'react'
import './solver.css'
import Loader from "../../atoms/loader/loader"
import addMines from "./helpers/addMines"
import checkAvailableFields from "./helpers/checkAvailableFields"
import calculateOdds from "./helpers/calculateOdds"
import Success from "../../atoms/success/success"

interface Props {
  mapSize: number,
  socket: any
}

const calculationFireDivider = 4

const Solver: FC<Props> = ({mapSize, socket}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  let map: string[][]
  let whenFireStatisticCalculator
  let mapDimension
  let fieldsToOpen = []
  let checkedCoords = {}

  const sendToSocket = (msg: string): void => {
    socket.send(msg)
  }

  useEffect(() => {
    setLoading(true)
    setPassword('')
    sendToSocket(`new ${mapSize}`)
  }, [mapSize]);

  const openNextCoords = (): void => {
    const {x, y} = fieldsToOpen[0]
    sendToSocket(`open ${x} ${y}`)
    fieldsToOpen.shift()
  }

  const generateMap = (data: string): string[][] => {
    console.log('data', data)
    const mapField = data.trim().split(/\n/).slice(1)
    const mapArray = mapField.map((item: string) => item.split(''))
    mapDimension = [mapArray.length, mapArray[0].length]

    if (!whenFireStatisticCalculator) {
      whenFireStatisticCalculator = (mapDimension[0] * mapDimension[1]) / calculationFireDivider
    }

    return mapArray
  }

  const getRandomCoords = (unopenedFields): {x: string, y:string} => {
    const random = Math.floor((Math.random() * unopenedFields.length))
    return unopenedFields[random]
  }

  socket.onmessage = ({data}) => {
    if (data === 'new: OK') {
      // on new game reset all globals
      map = [[]]
      fieldsToOpen = []
      sendToSocket('map')
    } else if (data.includes('map:')) {

      // no need to loop trough if we already have coords
      if (fieldsToOpen.length) {
        openNextCoords()
        return
      }

      ({map, checkedCoords} = addMines(generateMap(data), checkedCoords, mapDimension))

      let unopenedFields;
      ({unopenedFields, fieldsToOpen} = checkAvailableFields(map, checkedCoords, mapDimension))

      if (!fieldsToOpen.length) {

        // start calculating only at end, for performance
        if (whenFireStatisticCalculator > unopenedFields.length) {
          const [x, y] = calculateOdds(map, checkedCoords, mapDimension)

          if(x && y) {
            sendToSocket(`open ${x} ${y}`)
            return
          }
        }

        const {x, y} = getRandomCoords(unopenedFields)
        sendToSocket(`open ${x} ${y}`)

      } else {
        openNextCoords()
      }

    } else if (data === 'open: OK') {
      sendToSocket('map')
    } else if (data === 'open: You lose') {
      sendToSocket(`new ${mapSize}`)
    } else if (data.includes('You win')) {
      console.log(data)
      setLoading(false)
      setPassword(data.split('.')[1])
    } else {
      console.log(data)
    }
  }
  return (
    <section className="solver">
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12">
            {loading ?
              <div>
                <Loader className="solver__loader"/>
                <h2>Computer is processing, this can take some time - you can check progress in console</h2>
              </div>
              : <Success password={password} />
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solver
