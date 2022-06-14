import {useEffect, useState} from 'react'

function useTimer (hasWon) {
    const [timePassed, setTimePassed] = useState(0)
    const [timer, setTimer] = useState("00:00:00")
    const [isRunning, setIsRunning] = useState(false)

  // starts a setInterval when conditions are met, clears it when hasWon updates
    useEffect(() => {
        let intervalId
        if(!hasWon && !isRunning) {
          intervalId = setInterval(() => {
            setIsRunning(true)
            return setTimePassed(prevTime => prevTime+1)}, 1000)
        }
  
        return () => {
          clearInterval(intervalId)
          setIsRunning(false)
        }
     
      }, [hasWon])

    //updates timeDisplay state every time the timer updates
    useEffect(() => {
        const time = {
          hours: Math.floor(timePassed/3600),
          minutes: Math.floor(timePassed % 3600 / 60),
          seconds: timePassed % 60
        }
      
      for (const key in time) {
        if(time[key] < 10) {
          time[key] = `0${time[key]}`
        }
      }
        setTimer(`${time.hours}:${time.minutes}:${time.seconds}`)
    }, [timePassed])

    
  function resetTimer(rollCount) {
    if( rollCount === 1) {
        setTimePassed(0)
    }
  }


    return [timer, resetTimer]
}

export default useTimer