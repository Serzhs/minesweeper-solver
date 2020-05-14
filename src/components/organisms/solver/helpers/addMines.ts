import getMinesAndUnopenedAround from "./getMinesAndUnopenedAround"
import {ICheckedCoords} from '../../../../interfces/map'

interface IReturn {
  map: string[][]
  checkedCoords: ICheckedCoords
}

const addMines = (mapArray: string[][], checkedCoords: ICheckedCoords, [w, h]: number[]): IReturn => {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {

      let col: string | number = mapArray[i][j]

      if (col === '0' || col === '-1') {
        checkedCoords[`x${j}y${i}`] = true
      }

      if (col !== '□') {
        col = parseInt(col)
        const {mines, unopenedCells} = getMinesAndUnopenedAround(mapArray, j, i)
        const unopenedCellsLen = unopenedCells.length
        const minesLen = mines.length

        if ((col === unopenedCellsLen && !minesLen) || col === unopenedCellsLen + minesLen) {
          unopenedCells.forEach(({x, y}) => {
            mapArray[y][x] = '-1'
          })
        }
      }
    }
  }

  return {
    map: mapArray,
    checkedCoords
  }
}

export default addMines