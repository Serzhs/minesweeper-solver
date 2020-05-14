import React, {FC, useState} from 'react'
import Header from '../organisms/header/header'
import Game from '../organisms/game/game'

interface IProps {
  socket: any
}

const PlayGame: FC<IProps> = ({socket}) => {
  const [mapSize, setMapSize] = useState<number>()
  const getMap = (size: 1 | 2 | 3 | 4): void => {
    setMapSize(size)
  }

  return (<div>
    <Header
      buttonClickHandler={getMap}
      mapSize={mapSize}
    />
    {mapSize && <Game socket={socket} mapSize={mapSize}/>}
  </div>)
}

export default PlayGame