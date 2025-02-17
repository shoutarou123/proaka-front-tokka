import FullCalendar from '@fullcalendar/react';
import dayGripPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';


export const BackCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      {/* カレンダー表示・非表示を切り替えるボタン */}
      <button className="back-button" onClick={() => setShowCalendar(!showCalendar)}>
        カレンダーに戻る
      </button>


      {/* カレンダーを表示 */}
      {
        showCalendar && (
          <div>
            <FullCalendar plugins={[dayGripPlugin]} />
          </div>
        )
      }
    </div>
  );
};
