import logo from './logo.svg';
import { BrowserRouter, Redirect, Route, Routes, Switch } from "react-router-dom";
import './App.css';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
