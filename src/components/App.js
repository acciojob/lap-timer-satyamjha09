import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0); // Time in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }
  };

  // Stop Timer
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Reset Timer
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };

  // Record Lap
  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  // Cleanup Timer on Unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format Time (mm:ss:cs)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(centiseconds).padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <h1>Lap Timer</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
