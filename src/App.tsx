import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './components/Top';
import Todos from './components/todos/todo';
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>

  );
}

export default App;