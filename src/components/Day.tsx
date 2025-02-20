import { useState } from "react";

export const Day = () => {
  const [date, setDate] = useState(new Date());

  const movePreviosDay = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const moveNextDay = () => {
    setDate((nextDate) => {
      const newDate = new Date(nextDate);
      newDate.setDate(nextDate.getDate() + 1);
      return newDate;
    });
  };

  const moveToday = () => {
    const now = new Date();
    if (date.getTime() !== now.getTime()) {
      setDate(now);
    } else {
      return
    }
  };
  

  return (
    <>
      <h1>
        {`${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`}
      </h1>
      <div>
        <button onClick={movePreviosDay}>前の日</button>
      </div>
      <div>
        <button onClick={moveToday}>本日</button>
      </div>
      <div>
        <button onClick={moveNextDay}>次の日</button>
      </div>
    </>
  )
}