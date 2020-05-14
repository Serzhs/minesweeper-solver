import {IFields} from '../../../../interfces/map'

interface IReturnValue {
  mines: IFields[]
  unopenedCells: IFields[]
}

const getMinesAndUnopenedAround = (mapArray, x, y): IReturnValue => {
  let valuesAround: IFields[] = []
  let mines: IFields[] = []
  let unopenedCells: IFields[] = []

  const pushValues = (yCoords: number) => {
    const yValues = mapArray[yCoords]

    valuesAround.push(
      {value: yValues[x - 1], x: x - 1, y:  yCoords},
      {value: yValues[x], x, y: yCoords},
      {value: yValues[x + 1], x: x + 1, y: yCoords}
    )
  }

  if (mapArray[y + 1]) {
    pushValues(y + 1)
  }

  valuesAround.push(
    {value: mapArray[y][x + 1], x: x + 1, y},
    {value: mapArray[y][x - 1], x: x - 1, y}
  )

  if (mapArray[y - 1]) {
    pushValues(y - 1)
  }

  valuesAround = valuesAround.filter((item) => item.value)

  valuesAround.forEach((item, i) => {
    const {value} = item
    if (value === '-1') {
      mines.push(item)
    } else if (value === '□') {
      unopenedCells.push(item)
    }
  })

  return {
    mines,
    unopenedCells
  }
}

export default getMinesAndUnopenedAround
