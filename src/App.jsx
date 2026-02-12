import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // or break
  const [cycles, setCycles] = useState(0);
  const breakTime = 5 * 60; // 5 minutes

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev === 1) {
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleTimerEnd = () => {
    setIsRunning(false);
    if (mode === "focus") {
      setMode("break");
      setTime(breakTime); // 5 minute break
    } else {
      setMode("focus");
      setTime(25 * 60); // back to working again
      setCycles((c) => c + 1);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");

    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col space-y-5 bg-black/15 text-offwhite">
        <h1 className="text-4xl font-black text-offwhite">
          {mode === "focus" ? "Focus Time" : "Break Time"}
        </h1>
        {/* Timer */}
        <div className="text-9xl font-black text-offwhite">{formatTime()}</div>
        <div id="buttons-div" className="space-x-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className=" text-lg px-6 py-3 bg-autumn rounded-lg font-bold hover:bg-offwhite duration-150 hover:text-autumn active:scale-[105%]"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="text-autumn text-lg px-6 py-3 bg-offwhite rounded-lg font-bold hover:bg-autumn duration-150 hover:text-offwhite active:scale-[105%]"
          >
            Reset
          </button>
        </div>
        <p className="text-xl font-bold">Cycles Completed: {cycles}</p>
      </div>
    </>
  );
}

export default App;
