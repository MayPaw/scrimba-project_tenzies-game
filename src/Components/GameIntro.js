import React from "react"

function GameIntro({ setHasStarted }) {
	function startGame () {
		setHasStarted(true)
	}

	return (
		<main className = "board">
				<h1 className = "board__title"> Welcome to Tenzies!</h1>
				<p className = "board__text status">
					Roll until all dice are the same. <br />
					Click each die to freeze it at its current value between rolls.
					<br /> In order to start the game, click 'Start Game' button.
					<br /> To quit, close the page.
				</p>
			<button className = "board__btn" onClick={startGame}>
				Start Game
			</button>
		</main>
	)
}

export default GameIntro
