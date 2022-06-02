import React from 'react'

export default function Header(props) {
    
    return (
        <header>
            <h1 className="title">Tenzies</h1>
                <p className = "roll-count"> roll count: {props.count}</p>
                <p className = "timer"> time: {props.timer}</p>
                {props.tenzies? <p className = "instructions">Congratulations! You have won the game!</p> 
                : <p className="instructions">Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.</p> }
        </header>
    )
}