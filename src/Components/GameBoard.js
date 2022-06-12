import React, { useState, useEffect } from "react"
import Die from "./Die"
import useTimer from "../hooks/useTimer"
import { nanoid } from "nanoid"

function GameBoard({ tenzies, setTenzies, count, setCount }) {
	const [diceArray, setDiceArray] = useState(generateDiceArray())

	// checks if number of held dice matches the number of all dice displayed
	// if so, changes state of tenzies to true
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
				setTenzies(true)
			} else {
				setTenzies(false)
			}
		}
	}, [diceArray])

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

	// generates a new dice set, without making changes to the dice that are held
	function rollDice() {
		if (tenzies) {
			setCount(1)
			setDiceArray(generateDiceArray)
		} else {
			setCount((prevCount) => prevCount + 1)
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
				<p className = "board__text board__text--roll-count"> roll count: {count}</p>
				<p className = "board__text board__text--timer"> timer: {useTimer(count, tenzies)}</p>

				{tenzies? <p className="board__text status">
						Congratulations! You have won the game!
					</p> : <div className = "board__text status"> </div>
				}
        
			{displayDice()}
			<button className = "board__btn" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	)
}

export default GameBoard
