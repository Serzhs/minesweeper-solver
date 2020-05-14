import React, {FC} from 'react'
import './lost.css'

interface IProps {
  tryAgainHandler: () => void
}

const Lost: FC<IProps> = ({ tryAgainHandler }) => {
  return (
    <div className="lost">
      You lost!
      <br/>
      <button onClick={() => tryAgainHandler()}>
        Try again
      </button>
    </div>
  );
}

export default Lost;
