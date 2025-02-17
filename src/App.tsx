import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos/todo';
import FullCalendar from '@fullcalendar/react';
import dayGripPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';
import { Day } from './components/Day';


function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (

    <BrowserRouter>
      <Day /><br />
      {/* カレンダー表示・非表示を切り替えるボタン */}
      <button onClick={() => setShowCalendar(!showCalendar)}>カレンダーに戻る</button>

      {/* カレンダーを表示 */}
      {showCalendar && (
        <div>
          <FullCalendar plugins={[dayGripPlugin]} />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;