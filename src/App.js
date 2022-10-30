import React, { useEffect, useState} from "react";
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
import AccountPage from "./pages/AccountPage";

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState('')
  const [userInf, setUserInf] = useState([])
  const [isUserInfLoaded, setIsUserInfLoaded] = useState(false)

  const fetchUserInfo = async (config) => {
    await axios.post('http://localhost:5000/auth/getUserInformation', {id: localStorage.getItem('id')}, config)
    .then(res => {
      setUserInf(res.data.userInf)
      setIsUserInfLoaded(true)
    }).catch(() => {
      // setIsUserInfLoaded(false)
      console.log(123)
    })
  }
  
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
      setIsAuth(true)
      axios.post('http://localhost:5000/auth/checkAuth', {}, config).then(res => setRole(res.data.role[0])).catch(() => {
        setIsAuth(false)
        localStorage.removeItem('token')
      })

      fetchUserInfo(config)
      
    }
  }, [])
  return (
    
    <AuthContext.Provider value={{
      isAuth, 
      setIsAuth,
      role,
      setRole,
      userInf,
      setUserInf,
      isUserInfLoaded,
      setIsUserInfLoaded
    }}>
      <Router>
        <NavBar/>
        <Routes>
          <Route path='/login' element={isAuth ? <Navigate to='/'/> : <Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/' element={<Movies/>}/>
          <Route path='/:title' element={<MovieItemPage/>} />
          <Route path='/account/:name' element={<AccountPage/>} />
          <Route path='*' element={<Navigate to='/404'/>}/>
          <Route path='/404' element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
