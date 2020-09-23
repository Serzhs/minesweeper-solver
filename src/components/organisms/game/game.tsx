import React, {FC, useEffect, useState} from 'react'
import './game.css'
import Map from "../../molecules/map/map"
import Lost from "../../molecules/lost/lost"
import Success from "../../atoms/success/success"

interface IProps {
  mapSize: number,
  socket: any
}

const Game: FC<IProps> = ({mapSize, socket}) => {
  const [lost, setLost] = useState<boolean>(false)
  const [map, setMap] = useState<string[][]>([[]])
  const [flaggedFields, setFlaggedFields] = useState<string[]>()
  const [password, setPassword] = useState<string>()

  let mapArray: string[][]

  useEffect(() => {
    socket.onmessage = ({data}): void => {
      if (data === 'new: OK') {
        socket.send('map')
      } else if (data.includes('map:')) {
        generateMap(data)
      } else if (data === 'open: OK') {
        socket.send('map')
      } else if (data === 'open: You lose') {
        setLost(true)
      } else if (data.includes('You win')) {
        setPassword(data.split('.')[1])
      }
    }
  })

  useEffect(() => {
    setPassword('')
    setLost(false)
    socket.send(`new ${mapSize}`)
    setFlaggedFields([])
  }, [mapSize, socket]);

  const generateMap = (data: string) => {
    let mapField = data.trim().split(/\n/).slice(1)
    mapArray = mapField.map((item: string) => item.split(''))
    setMap(mapArray)
  }

  const tryAgain = (): void => {
    socket.send(`new ${mapSize}`)
    setLost(false)
    setFlaggedFields([])
  }

  const addFlag = (x: number, y: number): void => {
    const coords = `${x} ${y}`
    const hasValue = flaggedFields.includes(coords)

    if (!hasValue) {
      setFlaggedFields([...flaggedFields, coords])
    } else {
      setFlaggedFields([...flaggedFields.filter(item => item !== coords)])
    }
  }

  const selectField = (x: number, y: number): void => {
    socket.send(`open ${x} ${y}`)
  }

  return (
    <div>
      <section className="game">
        <div className="container">
          <div className="row center-xs">
            <div className="col-xs-12">
              {lost && <Lost tryAgainHandler={tryAgain}/>}
              {password && <Success password={password} />}
            </div>
          </div>
        </div>
      </section>
      {(map[0][0] && !lost && !password) &&
      <Map fieldsClickHandler={selectField} addFlagHandler={addFlag} map={map} flaggedFields={flaggedFields}/>}
    </div>
  )
}

export default Game
