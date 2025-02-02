import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import './App.css'
import Treks from './pages/Treks';
import Events from './pages/Events';
import AboutUs from './pages/AboutUs';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/treks" element={<Treks />} />
        <Route path="/events" element={<Events />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
