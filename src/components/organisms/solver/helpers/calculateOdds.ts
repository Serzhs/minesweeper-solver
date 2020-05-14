import getMinesAndUnopenedAround from "./getMinesAndUnopenedAround"
import {ICheckedCoords} from '../../../../interfces/map'

const calculateOdds = (mapArray: string[][], checkedCoords: ICheckedCoords, [w, h]: number[]): string[] => {
  let odds = {}
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let col: string | number = mapArray[i][j]

      if (col !== '□' && !checkedCoords[`x${j}y${i}`]) {
        col = parseInt(col)
        const {mines, unopenedCells} = getMinesAndUnopenedAround(mapArray, j, i)

        if (mines.length !== col && unopenedCells.length) {
          const minesLen = mines.length
          const minesLeft = minesLen ? (col - (+minesLen)) : col
          const oddsEachUnopenedMark = minesLeft / unopenedCells.length

          // calculate lowest chance of mine per field
          unopenedCells.forEach(({x, y}) => {
            if (!odds[`X${x}Y${y}`]) {
              odds[`X${x}Y${y}`] = oddsEachUnopenedMark
            } else {
              if (odds[`X${x}Y${y}`] < oddsEachUnopenedMark) {
                odds[`X${x}Y${y}`] = oddsEachUnopenedMark
              }
            }
          })
        }
      }
    }
  }

  const keys = Object.keys(odds)
  console.log('odds', odds)
  let lowestRate
  let nextCoords
  // get lowest chance of mine per field
  keys.forEach((key) => {
    const val = odds[key]
    if(!lowestRate || val < lowestRate) {
      console.log('val', val)
      console.log('key', key)
      lowestRate = val
      nextCoords = key
    }
  })

  return nextCoords.replace("X", "").split('Y')
}

export default calculateOdds
