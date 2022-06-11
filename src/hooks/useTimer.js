import {useEffect, useState} from 'react'

function useTimer (count, tenzies) {
    const [timer, setTimer] = useState(0)
    const [timeDisplay, setTimeDisplay] = useState("00:00:00")

  // starts a setInterval when conditions are met, clears it when tenzies update
    useEffect(() => {
        let intervalId
        if(timer === 0 && !tenzies) {
          intervalId = setInterval(() => {
            console.log(timer)
            return setTimer(prevTime => prevTime+1)}, 1000)
        }
  
        return () => clearInterval(intervalId)
     
      }, [tenzies])

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
        if( count === 1) {
            setTimer(0)
        }
    },[count])

    return timeDisplay
}

export default useTimer