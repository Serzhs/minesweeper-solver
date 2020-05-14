import React, { FC } from 'react';
import './success.css'

interface IProps {
  password: string
}

const Success: FC<IProps> = ({password}) => {
  return (
    <span className="success">
      {password}
    </span>
  )
}

export default Success
