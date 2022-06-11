import React from 'react'

function GameIntro ({setHasStarted}) {
    return (
        <main> 
            <header>
              <h1 className="title"> Welcome to Tenzies!</h1>
              <p className="instructions">Roll until all dice are the same. <br/> 
                Click each die to freeze it at its current value between rolls.
                <br/> In order to start the game, click 'Start Game' button.
                <br/> To quit, close the page. </p>
            </header>
            <button className = "btn" 
              onClick = {() => setHasStarted(true)}> 
                Start Game
            </button>
          </main> 
    )
}

export default GameIntro