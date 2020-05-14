import React, { FC } from 'react';
import './loader.css'

interface IProps {
  isAbsolute?: boolean,
  className?: string
}

const Loader: FC<IProps> = ({isAbsolute, className}) => {
  return (
    <div className={`loader ${className} ${isAbsolute ? 'absolute' : ''}`}/>
  )
}

export default Loader
