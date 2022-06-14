import React, { useState, useEffect } from "react"
import Die from "./Die"
import useTimer from "../hooks/useTimer"
import { nanoid } from "nanoid"

function GameBoard() {
	const [hasWon, setHasWon] = useState(false)
	const [rollCount, setRollCount] = useState(1)
	const [diceArray, setDiceArray] = useState(generateDiceArray())
	const [timer, resetTimer] = useTimer(hasWon)

	// checks if number of held dice matches the number of all dice displayed
	// if so, changes state of hasWon to true
	useEffect(() => {
		let isHeldCount = 0
		let sum = 0
		for (const die of diceArray) {
			sum += die.value
			isHeldCount += die.isHeld ? 1 : 0

			if (
				sum === diceArray[0].value * diceArray.length &&
				isHeldCount === diceArray.length
			) {
				setHasWon(true)
			} else {
				setHasWon(false)
			}
		}
	}, [diceArray])

	//resets timer at rollCount === 1
	useEffect(() => {
		resetTimer(rollCount)
	}, [rollCount])


	function generateDice() {
		return {
			value: Math.floor(Math.random() * 6 + 1),
			isHeld: false,
			id: nanoid(),
		}
	}

	function generateDiceArray() {
		const diceArray = []
		for (let i = 0; i < 10; i++) {
			diceArray.push(generateDice())
		}
		return diceArray
	}

	// creates an array of Die instances
	function displayDice() {
		return diceArray.map((die) => {
			return (
				<Die
					key={die.id}
					value={die.value}
					isHeld={die.isHeld}
					handleClick={() => holdDie(die.id)}
				/>
			)
		})
	}

  // updates isHeld property of the die with matching id in the diceArray;
  function holdDie(id) {
    setDiceArray((oldArray) =>
      oldArray.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

	// if hasWon is true, generates new diceArray; if hasWon is false,
	// generates a new diceArray, without making changes to the dice with isHeld set to true
	function handleButtonClick() {
		if (hasWon) {
			setRollCount(1)
			setDiceArray(generateDiceArray)
		} else {
			setRollCount((prevCount) => prevCount + 1)
			setDiceArray((oldArray) =>
				oldArray.map((die) => {
					return die.isHeld ? die : generateDice()
				})
			)
		}
	}


	return (
		<main className = "board">
				<h1 className = "board__title">Tenzies</h1>
				<p className = "board__text board__text--roll-count"> roll count: {rollCount}</p>
				<p className = "board__text board__text--timer"> timer: {timer}</p>

				{hasWon? <p className="board__text status">
						Congratulations! You have won the game!
					</p> : <div className = "board__text status"> </div>
				}
        
			{displayDice()}
			<button className = "board__btn" onClick={handleButtonClick}>
				{hasWon ? "New Game" : "Roll"}
			</button>
		</main>
	)
}

export default GameBoard
