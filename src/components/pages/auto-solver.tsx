import React, {FC, useState} from 'react'
import Header from '../organisms/header/header'
import Solver from '../organisms/solver/solver'

interface IProps {
  socket: any
}

const AutoSolver: FC<IProps> = ({socket}) => {
  const [mapSize, setMapSize] = useState<number>()
  const getMap = (size: 1 | 2 | 3 | 4) => {
    setMapSize(size)
  }

  return (
    <div>
      <Header
        buttonClickHandler={getMap}
        mapSize={mapSize}
      />
      {mapSize && <Solver mapSize={mapSize} socket={socket} />}
    </div>
  )
}

export default AutoSolver
