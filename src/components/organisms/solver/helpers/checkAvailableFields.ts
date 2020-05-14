import getMinesAndUnopenedAround from "./getMinesAndUnopenedAround"
import {uniqBy} from 'lodash'
import {ICoords, IFields} from '../../../../interfces/map'
import {ICheckedCoords} from '../../../../interfces/map'


interface IReturnValue {
  fieldsToOpen: IFields[],
  unopenedFields: ICoords[],
}

const checkAvailableFields = (mapArray: string[][], checkedCoords: ICheckedCoords, [w, h]: number[]): IReturnValue => {
  let unopenedFields: ICoords[] = []
  let fieldsToOpen: IFields[] = []
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let col: string | number = mapArray[i][j]

      if (col === '□') {
        unopenedFields.push({x: j, y: i})
      }

      if (col !== '□' && !checkedCoords[`x${j}y${i}`]) {
        col = parseInt(col)
        const {mines, unopenedCells} = getMinesAndUnopenedAround(mapArray, j, i)

        if (col === mines.length) {
          fieldsToOpen = fieldsToOpen.concat(unopenedCells)

        }

      }
    }
  }

  return {
    fieldsToOpen: uniqBy(fieldsToOpen, ({x, y}) => [x, y].join()),
    unopenedFields
  }
}

export default checkAvailableFields
