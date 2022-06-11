import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './Components/GameBoard.js'
import GameIntro from './Components/GameIntro';


function App() {
  const [tenzies, setTenzies] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [count, setCount] = useState(1)


  return (
    <>
      {
        hasStarted? <GameBoard tenzies = {tenzies} setTenzies = {setTenzies} count = {count} setCount = {setCount} />
        : <GameIntro setHasStarted = {setHasStarted} />
      }
    </>
  );
}

export default App;
