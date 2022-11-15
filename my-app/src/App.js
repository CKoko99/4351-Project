import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Reservation from './components/Reservation/Reservation';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book-reservation" element={<Reservation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
