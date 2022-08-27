import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import './App.css';
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Registration from "./pages/Registration";
import MovieItemPage from "./pages/MovieItemPage";
import axios from "axios";
import { AuthContext } from "./context";

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState('')
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      console.log(localStorage.getItem('token'));
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
        setIsAuth(true)
        axios.post('http://localhost:5000/auth/checkAuth', {}, config).then((res) => setRole(res.data.role[0])).catch(() => setIsAuth(false))
    }
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth,
      role,
      setRole
    }}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/login' element={isAuth ? <Navigate to='/'/> : <Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/' element={<Movies/>}/>
          <Route path='/:type/:title' element={<MovieItemPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
