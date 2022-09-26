import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Main from './pages/app/main';
import Check from './pages/auth/Check';
import SellPage from './pages/app/sell';
import Requests from './pages/app/requests';

function App() {
  return (
  <>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/new-account" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/check" element={<Check />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
