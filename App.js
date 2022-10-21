import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [timerType, setTimerType] = useState('Pomodoro')



  return (
    <div class="col-md-12 text-center">
      <h1 className="App">Pomodoro Timer</h1>
      {/* <Button variant="info" onClick={() => setTimerType()}>Pomodoro</Button> */}
      <button onClick={() => setTimerType('Pomodoro')}>Pomodoro</button>
      <button onClick={() => setTimerType('Short Break')}>Short Break</button>
      <button onClick={() => setTimerType('Long Break')}>Long Break</button>
      <Timer timerType={timerType}/>
    </div>
  );
};

export default App;


/*
- Pomodoro button should access the timer function starting at 60*25
- Short Break button should access timer function starting at 60*5
- Long Break button should access timer function starting at 60*10 
*/