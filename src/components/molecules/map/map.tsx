import React, {FC} from 'react'
import './map.css'

interface IProps {
  fieldsClickHandler: (x: number, y:number) => void
  addFlagHandler: (x: number, y:number) => void
  map: string[][]
  flaggedFields: string[]
}

const Map: FC<IProps> = ({fieldsClickHandler, addFlagHandler, map, flaggedFields}) => {
  const checkIfInt = (type: string): boolean => {
    return Number.isInteger(parseInt(type))
  }

  const checkIfIsFlagged = (x: number, y: number): boolean => {
    return flaggedFields.includes(`${x} ${y}`)
  }

  const clickHandler = (x: number, y: number): void => {
    if(checkIfIsFlagged(x, y)) {
      return
    }

    fieldsClickHandler(x, y)
  }

  const rightClickHandler = (e: React.MouseEvent<HTMLDivElement>, x: number, y: number): void => {
    e.preventDefault()

    if(map[y][x] === '□') {
      addFlagHandler(x, y)
    }
  }

  return (
    <div className="map">
      <div className="map__inner">
        {map.map((line, y) => (
          <div key={y} className="map__line">
            {line.map((col, x) => (
              <div key={x} className={`map__col ${checkIfInt(col) ? 'opened' : ''} ${checkIfIsFlagged(x, y) ? 'flagged' : ''}`}
                   onClick={() => clickHandler(x, y)} onContextMenu={(e) => rightClickHandler(e, x, y)}>
                {checkIfInt(col) && col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Map
