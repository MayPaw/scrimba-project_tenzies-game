function Die (props) {
    return (
        <div onClick = {props.handleClick}  className = {props.isHeld ? "board__die board__die--green" : "board__die"}>
           <p>{props.value}</p>
        </div>
    )
}

export default Die