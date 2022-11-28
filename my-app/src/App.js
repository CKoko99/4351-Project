import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage/Homepage';
import Reservation from './components/Reservation/Reservation';
import Admin from './components/Admin/Admin';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book-reservation" element={<Reservation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
