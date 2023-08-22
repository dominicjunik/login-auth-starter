import axios from 'axios'

import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import './App.css'


function App() {

    const [user, setUser] = useState({})

    let navigate = useNavigate()

    async function authentication(req, res){
        try {
            let token = JSON.parse(localStorage.getItem('token'))
            const response = await axios.get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            setUser(response.data)
            
        }catch(err) {
            console.log(err.message)
            localStorage.clear()
        }
    }

    useEffect(() => {
        authentication()
    }, [])

    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                {user.username ? <Route path="/profile" element={<Profile username={user.username} email={user.email} />} /> : <Route path="*" element={<Navigate to="/login" />} />}
                {user.username ? <Route path="/login" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login setUser={setUser} />} /> }
                {user.username ? <Route path="/register" element={<Navigate to="/" />} /> : <Route path="/login" element={<Login setUser={setUser} />} /> }
                <Route path="/register" element={<Register setUser={setUser} />} />
            </Routes>
        </div>
     );
}

export default App;