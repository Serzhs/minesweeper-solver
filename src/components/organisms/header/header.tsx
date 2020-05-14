import React, {FC} from 'react'
import Nav from '../../molecules/nav/nav'
import './header.css'

interface IProps {
  buttonClickHandler: (size: number) => void,
  mapSize: number
}

const mapTypes = ['extra small', 'small', 'medium', 'large']

const Header: FC<IProps> = ({buttonClickHandler, mapSize}) => {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <Nav/>
          </div>
        </div>
        <div className="row">
          {mapTypes.map((value, i) => (
            <div key={i} className="col-xs-3">
              <button onClick={() => buttonClickHandler(i + 1)}
                      className={`header__button ${mapSize === i + 1 ? 'active' : ''}`}>
                {value}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
