import FullCalendar from "@fullcalendar/react";
import dayGripPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // 追加
import jaLocale from '@fullcalendar/core/locales/ja'; // 追加
import { useEffect, useRef, useState } from "react";
import { useDay } from "./DayContext";

export const Day = () => {
  const {date, setDate} = useDay(); // Contextから`date`を取得
  const [showCalendar, setShowCalendar] = useState(false);

  // 日付を変更する関数
  const changeDate = (days: number) => {
    setDate((changeDate) => {
      const newDate = new Date(changeDate);
      newDate.setDate(changeDate.getDate() + days);
      return newDate;
    });
  };


  return (
    <>
      <h1>
        {`${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`}
      </h1>
      <div className="button-container">
        <button className="previos-day" onClick={() => changeDate(-1)}>前の日</button>
      
      
        <button className="back-button" onClick={() => setShowCalendar(!showCalendar)}>カレンダーに戻る</button>
      
      
        <button className="next-day" onClick={() => changeDate(1)}>次の日</button>
      </div>

      {/* カレンダー表示エリア */}
      { showCalendar && (
        <div>
          <FullCalendar
            plugins={[dayGripPlugin, timeGridPlugin]}
            locales={[jaLocale]}
            locale='ja'
            headerToolbar={{
              left: 'dayGridMonth dayGridWeek',
            }}
            // initialDate={date.toISOString().split("T")[0]} // 選択した日付をカレンダーの初期日付として設定
            key={date.toISOString()} // カレンダーを再描写するためのｷｰ
          />
        </div>
      )}
    </>
  );
};