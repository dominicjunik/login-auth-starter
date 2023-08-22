import axios from 'axios'

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css'


function App() {

    const [user, setUser] = useState({})

    useEffect(() => {
    }, [])

    return ( 
        <div className="app">
            <Navbar username={null} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile username={null} email={null} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
            </Routes>
        </div>
     );
}

export default App;