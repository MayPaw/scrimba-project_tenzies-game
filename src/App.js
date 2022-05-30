import React, { useEffect } from 'react';
import './App.css';
import Die from './Components/Die'
import Header from './Components/Header'
import {nanoid} from 'nanoid'

function App() {
  const [diceArray, setDiceArray] = React.useState(generateDiceArray())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [timer, setTimer] = React.useState("0:00")

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
      }
  },[diceArray])

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
    setCount(prevCount => prevCount+1)
    tenzies ? setDiceArray(generateDiceArray) :
    setDiceArray(oldArray => oldArray.map(die => {
      return die.isHeld ? die : generateDice()
    }))
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
      <Header tenzies = {tenzies} count = {count} timer = {timer}/>
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
