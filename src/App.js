import React, { useState } from 'react';
import './App.css';
import GameBoard from './Components/GameBoard.js'
import GameIntro from './Components/GameIntro';


function App() {
  const [hasStarted, setHasStarted] = useState(false)



  return (
    <>
      {
        hasStarted? <GameBoard />
        : <GameIntro setHasStarted = {setHasStarted} />
      }
    </>
  );
}

export default App;
