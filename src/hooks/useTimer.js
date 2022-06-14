import {useEffect, useState} from 'react'

function useTimer (rollCount, hasWon) {
    const [timer, setTimer] = useState(0)
    const [timeDisplay, setTimeDisplay] = useState("00:00:00")

  // starts a setInterval when conditions are met, clears it when hasWon updates
    useEffect(() => {
        let intervalId
        if(timer === 0 && !hasWon) {
          intervalId = setInterval(() => {
            console.log(timer)
            console.log(intervalId)
            return setTimer(prevTime => prevTime+1)}, 1000)
        }
  
        return () => clearInterval(intervalId)
     
      }, [hasWon])

    //updates timeDisplay state every time the timer updates
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
        setTimeDisplay(`${time.hours}:${time.minutes}:${time.seconds}`)
    }, [timer])

    
    useEffect (() =>{
        if( rollCount === 1) {
            setTimer(0)
        }
    },[rollCount])

    return timeDisplay
}

export default useTimer