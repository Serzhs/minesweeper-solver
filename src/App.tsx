import React, {useEffect, useRef, useState} from 'react'
import PlayGame from './components/pages/play-game'
import AutoSolver from "./components/pages/auto-solver"
import Loader from "./components/atoms/loader/loader"
import './style/libs/reboot.css'
import './style/libs/flexboxgrid.css'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("wss://hometask.eg1236.com/game1/");
    socket.current.onopen = () => {
      setLoading(false)
    }
  }, []);

  if(loading) {
    return <Loader isAbsolute={true} />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PlayGame socket={socket.current}/>
        </Route>
        <Route path="/auto-solver">
          <AutoSolver socket={socket.current}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
