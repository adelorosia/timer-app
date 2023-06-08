import React, { useState, useRef } from "react";

const Timer: React.FC = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const intervalRef = useRef<number>();

  const startInterval = () => {
    if (!isStart) {
      setIsStart(true);
      intervalRef.current = setInterval(() => {
        setSecond((prevSecond) => {
          let newSecond = prevSecond + 1;
          if (newSecond === 60) {
            newSecond = 0;
            setMinute((prevMinute) => {
              let newMinute = prevMinute + 1;
              if (newMinute === 60) {
                newMinute = 0;
                setHour((prevHour) => prevHour + 1);
              }
              return newMinute;
            });
          }
          return newSecond;
        });
      }, 1000);
    }
  };

  const stopInterval = () => {
    setIsStart(false);
    clearInterval(intervalRef.current);
  };

  const resetInterval = () => {
    stopInterval();
    setHour(0);
    setMinute(0);
    setSecond(0);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <span className="flex justify-center items-center border w-[200px] h-[200px] rounded-full shadow-lg shadow-gray-800 bg-red-600 text-2xl font-bold">
        {`${hour > 9 ? hour : "0" + hour} : ${
          minute > 9 ? minute : "0" + minute
        } : ${second > 9 ? second : "0" + second}`}
      </span>
      <div className="flex gap-16">
        <span
          className="px-8 py-3 bg-green-600 rounded-3xl cursor-pointer hover:bg-green-800 border border-black"
          onClick={startInterval}
        >
          Start
        </span>
        <span
          className="px-8 py-3 bg-purple-600 rounded-3xl cursor-pointer hover:bg-purple-800 border border-black"
          onClick={stopInterval}
        >
          Stop
        </span>
        <span
          className="px-8 py-3 bg-yellow-600 rounded-3xl cursor-pointer hover:bg-yellow-800 border border-black"
          onClick={resetInterval}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default Timer;
