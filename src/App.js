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
import ScrollToTop from "./components/ScrollToTop";
import { logOut } from "./utils/LogOut";

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [role, setRole] = useState('')
  const [userInf, setUserInf] = useState([])
  const [isUserInfLoaded, setIsUserInfLoaded] = useState(false)

  const fetchUserInfo = (config) => {
    axios.post('http://localhost:5000/auth/getUserInformation', {}, config)
    .then(res => {
      setUserInf(res.data.userInf)
      setIsUserInfLoaded(true)
      // setRole(res.data.role[0])
      setIsAuth(true)
    }).catch((e) => {
      // setIsUserInfLoaded(false)
      console.log(e)
      localStorage.removeItem('token')
      logOut(setRole, setUserInf, setIsUserInfLoaded, setIsAuth)
    })
  }
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
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
        <ScrollToTop />
        <NavBar/>
        <Routes>
          <Route path='/login' element={isAuth ? <Navigate to='/'/> : <Login/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/' element={<Movies/>}/>
          <Route path='/movie/:title' element={<MovieItemPage/>} />
          <Route path='/account/:name' element={<AccountPage/>} />
          <Route path='*' element={<Navigate to='/404'/>}/>
          <Route path='/404' element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
