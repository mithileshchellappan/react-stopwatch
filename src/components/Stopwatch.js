import React, { useState, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
    setStartTime(null);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleReset = () => {
    if (!isRunning) {
      setElapsedTime(0);
      setLaps([]);
    }
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = Date.now() - startTime;
      setLaps([...laps, lapTime]);
    }
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);

    return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}:
            ${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time">{formatTime(elapsedTime)}</div>
      <div className="controls">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handlePause}>Pause</button>
        )}
        <button onClick={handleStop}>Stop</button>
        {!isRunning && (
          <button onClick={handleReset} disabled={elapsedTime === 0}>
            Reset
          </button>
        )}
        {isRunning && (
          <button onClick={handleLap}>Lap</button>
        )}
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
