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

  const reset = () => {
    game.reset()
    setRunning(false)
  }

  return (
    <div className="root">
      <header className="header">
        <h1>Robin Dood</h1>
      </header>
      <div className="content">
        <div className="sidebar">
          {running ? (
            <button type="button" onClick={stop}>
              Stop
            </button>
          ) : (
            <button type="button" onClick={start}>
              Start
            </button>
          )}
          <button type="button" onClick={reset}>
            Reset
          </button>
          <ul>
            <li>WASD to move</li>
            <li>Click to fire</li>
          </ul>
        </div>
        <div className="canvas-container">
          <canvas id="canvas" height="640" width="800" />
        </div>
      </div>
    </div>
  )
}

export default App
