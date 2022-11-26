import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Reservation from './components/Reservation/Reservation';
import Admin from './components/Admin/Admin';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book-reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
