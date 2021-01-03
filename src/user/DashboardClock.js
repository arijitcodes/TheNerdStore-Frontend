import React, { useEffect, useState } from "react";

const DashboardClock = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    tick();
  }, [time]);

  const tick = () => {
    const dateTime = new Date().toString();
    /* const date = "Date: " + dateTime.toLocaleDateString();
    const time = "Time: " + dateTime.toLocaleTimeString(); */
    setTimeout(() => {
      setTime(dateTime);
    }, 1000);
  };

  return (
    <>
      Date &amp; Time:
      <span className="mx-1 ml-2 text-secondary">
        {new Date(time).toString()}
      </span>
    </>
  );
};

export default DashboardClock;
