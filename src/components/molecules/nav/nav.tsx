import React, {FC} from 'react'
import { NavLink,} from "react-router-dom"
import './nav.css'

const Nav: FC = () => {
  return (
    <nav className="nav">
      <NavLink to="/" exact className="nav__item" activeClassName="active">Game</NavLink>
      <NavLink to="/auto-solver" className="nav__item" activeClassName="active">Auto Solver</NavLink>
    </nav>
  )
}

export default Nav
