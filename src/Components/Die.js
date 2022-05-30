function Die (props) {
    return (
        <div onClick = {props.handleClick}  className = {props.isHeld ? "die green" : "die"}>
           <p>{props.value}</p>
        </div>
    )
}

export default Die