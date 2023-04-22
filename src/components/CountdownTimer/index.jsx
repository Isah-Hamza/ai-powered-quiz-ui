import React, { useState, useEffect } from "react";
import clock from "../../assets/images/icons8-time-80.png";

function CountdownTimer({ minutes, timeUp }) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [submitted, setSubmitted] = useState(false);

  const minutesRemaining = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (submitted === true) return;
    if (minutesRemaining == 0 && secondsRemaining == 0) {
      timeUp();
      setSubmitted(true);
      console.log("hi, time up");
    }
  }, [minutesRemaining, secondsRemaining, submitted]);

  return (
    <div className="flex items-center gap-2 absolute top-3 right-10">
      <img src={clock} className="w-16" />
      <div className="">
        {seconds > 0 ? (
          <p
            className={`text-3xl font-medium  ${
              minutesRemaining == 0 ? "text-[coral]" : "text-green-800"
            }`}
          >
            {minutesRemaining}:
            {secondsRemaining.toString().length == 1
              ? `0${secondsRemaining}`
              : secondsRemaining}
          </p>
        ) : (
          <p>Time Elapsed</p>
        )}
        {seconds > 0 ? (
          <p className="text-sm">Time remaining</p>
        ) : (
          <p className="text-sm">Submitting...</p>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
