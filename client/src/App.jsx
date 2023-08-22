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
    const [authIsReady, setAuthIsReady] = useState(false)

    let navigate = useNavigate()

    async function authentication(req, res){
        let newUser
        try {
            let token = JSON.parse(localStorage.getItem('token'))
            if (token) {
                const response = await axios.get('/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                newUser = response.data            
                setUser(newUser) 
            }
            
        }catch(err) {
            console.log(err.message)
            localStorage.clear()
        }
        setAuthIsReady(true)
    }

    useEffect(() => {
        authentication()
    }, [])

    return ( 
        <div className="app">
            <Navbar username={user.username} setUser={setUser} />
            {authIsReady && (<Routes>
                <Route path="/" element={<Home />} />

                <Route path="/profile" element={ user.username ? <Profile username={user.username} email={user.email} /> : <Navigate to="/login" />} />
                <Route path="/login" element={ !user.username ? <Login setUser={setUser} /> : <Navigate to='/' />} /> 
                <Route path="/register" element={ !user.username ? <Register setUser={setUser} /> : <Navigate to='/' />} /> 
            </Routes>)}
            
        </div>
     );
}

export default App;