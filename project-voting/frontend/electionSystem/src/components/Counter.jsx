import React, { useState, useEffect } from "react";

function Counter() {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;
        if (minutes > 0) {
          setMinutes(minutes - 1);
          return 59;
        }
        if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          return 59;
        }
        if (days > 0) {
          setDays(days - 1);
          setHours(23);
          setMinutes(59);
          return 59;
        }
        clearInterval(interval); // All counters have reached zero
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [seconds, minutes, hours, days]);

  return (
    <>
      <h2 className=" relative text-3xl font-bold text-center  before after my-10  mx-6">
        باقي على إنتهاء الأنتخابات
      </h2>

      <div className="grid grid-flow-col gap-5 text-center auto-cols-max items-center justify-center w-fit mx-auto rounded-2xl bg-black">
        <div className="flex flex-col p-2 bg-transparent rounded-box   text-white">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": days }}></span>
          </span>
          أيام
        </div>
        <div className="flex flex-col p-2 bg-transparent rounded-box text-white  ">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours }}></span>
          </span>
          ساعة
        </div>
        <div className="flex flex-col p-2 bg-transparent rounded-box text-white ">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          دقيقة
        </div>
        <div className="flex flex-col p-2 bg-transparent rounded-box text-white ">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          ثانية
        </div>
      </div>
    </>
  );
}

export default Counter;
