import React, { useEffect } from 'react';
import './App.css';
import Die from './Components/Die'
import Header from './Components/Header'
import {nanoid} from 'nanoid'

function App() {
  const [diceArray, setDiceArray] = React.useState(generateDiceArray())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(1)
  const [timer, setTimer] = React.useState(0)
  const [timeDisplay, setTimeDisplay] = React.useState("00:00:00")
 
  useEffect(() => {
      let isHeldCount = 0
      let sum = 0
      for (const die of diceArray){
        sum += die.value
        isHeldCount += die.isHeld ? 1 : 0
  
        if(sum === diceArray[0].value*diceArray.length 
          && isHeldCount === diceArray.length){
          setTenzies(true)
        } else {setTenzies(false)}

        console.log("useEffect holding die")
      }

      
  },[diceArray])

  useEffect(() => {
    let intervalId
    if(timer === 0 && !tenzies) {
      intervalId = setInterval(() => setTimer(prevTime => prevTime+1), 1000)
    }
    console.log("useEffect interval")
    return () => clearInterval(intervalId)

  }, [tenzies])

  useEffect(() => {
    const time = {
      hours: Math.floor(timer/3600),
      minutes: Math.floor(timer/60),
      seconds: timer % 60
    }
  
  for (const key in time) {
    if(time[key] < 10) {
      time[key] = `0${time[key]}`
    }
  }
  console.log("useEffect timeDisplay")
    setTimeDisplay(`${time.hours}:${time.minutes}:${time.seconds}`)
  }, [timer])


  function generateDice() {
    return {
      value: Math.floor((Math.random()*6)+1),
      isHeld: false,
      id: nanoid()
    }
  }

  function generateDiceArray(){
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateDice())
    }
    return diceArray
  }

  function displayDice() {
    return diceArray.map(die => {
      return <Die key = {die.id}
                  value = {die.value}
                  isHeld = {die.isHeld}
                  handleClick = {() => holdDie(die.id)} 
                  />})
  }
  
  function rollDice() {
    if(tenzies) {
      setTimer(0)
      setCount(1)
      setDiceArray(generateDiceArray)
    } else {
      setCount(prevCount => prevCount+1)
      setDiceArray(oldArray => oldArray.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    }
  }

  function holdDie(id){
    setDiceArray(oldArray => oldArray.map(die => {
        return die.id === id ?
              {...die, isHeld: !die.isHeld}
              : die 
      })
    )
  }
  
  return (
    <main>
    <Header tenzies = {tenzies} count = {count} timer = {timeDisplay}/>
        <div className = "dice-container">
          {displayDice()}
        </div>
        <button 
          className = "roll-btn"
          onClick = {rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  );
}

export default App;
