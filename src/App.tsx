import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos/todo';
import FullCalendar from '@fullcalendar/react';
import dayGripPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';
import { Day } from './components/Day';
import { DayProvider } from './components/DayContext';


function App() {

  return (

    <BrowserRouter>
      <DayProvider>
        <Day /><br />

        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </DayProvider>
    </BrowserRouter>

  );
}

export default App;