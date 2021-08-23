import React, { useState, useEffect } from 'react'
import './App.css'
import * as game from './game'

function App() {
  const [ready, setReady] = useState(false)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    game.setup()
    setReady(true)
  }, [])

  const start = () => {
    if (ready) {
      game.start()
      setRunning(true)
    }
  }
  const stop = () => {
    if (running) {
      game.stop()
      setRunning(false)
    }
  }

  return (
    <div className="root">
      <header className="header">
        <h1>Robin Dood</h1>
      </header>
      <div className="content">
        <canvas id="canvas" height="800" width="800" />
        <button type="button" onClick={start}>
          Start
        </button>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button type="button" onClick={game.reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
