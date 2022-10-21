import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import ding from "../audio/ding.mp3"


const Timer = ({timerType}) => {
  const [startTimer, setStartTimer] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState()  

  const audio = new Audio(ding);
  
  useEffect(() => {
    setStartTimer(false)
    if(timerType === 'Pomodoro'){
      setSecondsLeft(60*25)
    } else if(timerType === 'Short Break'){
      setSecondsLeft(5)
    } else if(timerType === 'Long Break'){
      setSecondsLeft(60*10)
    }
  }, [timerType]);

  useEffect(() => {
    const scheduledTimer = 
    setInterval(() => {
      if(startTimer && secondsLeft !== 0){
        const newTime = secondsLeft - 1
        setSecondsLeft(newTime)
        if(newTime === 0){
          audio.play()
        }
      } else {
        clearInterval(scheduledTimer)
      }
    }, 1000);
    return () => clearInterval(scheduledTimer)
  }, [startTimer, secondsLeft])

  const reset = () => {
    setStartTimer(false)
    if (timerType === 'Pomodoro'){
      setSecondsLeft(60*25)
    } else if(timerType === 'Short Break'){
      setSecondsLeft(60*5)
    } else if(timerType === 'Long Break'){
      setSecondsLeft(60*10);
    }
  }

  return (
    <Container>
      <div>{ secondsLeft }</div >
      <Button variant="success" onClick={() => setStartTimer(true)}>START</Button>
      <Button variant="danger" onClick={() => setStartTimer(false)}>PAUSE</Button>
      <Button variant="success" onClick={() => setStartTimer(true)}>RESUME</Button>
      <Button variant="warning" onClick={reset}>RESET</Button>
    </Container> 
  )
}

export default Timer;
