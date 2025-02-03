import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Team from "./pages/Team";
import "./App.css";
import Treks from "./pages/Treks";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) {
          return true;
        }
      }
    }
    setLoggedIn(getCookie("connect.sid"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />} />
        <Route path="/team" element={<Team loggedIn={loggedIn} />} />
        <Route path="/treks" element={<Treks loggedIn={loggedIn} />} />
        <Route path="/events" element={<Events loggedIn={loggedIn} />} />
        <Route path="/aboutus" element={<AboutUs loggedIn={loggedIn} />} />
        <Route path="/user/dashboard" element={<UserDashboard setLoggedIn={setLoggedIn}/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
