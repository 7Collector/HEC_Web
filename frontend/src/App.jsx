import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
