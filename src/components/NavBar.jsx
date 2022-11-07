import React, { useContext } from "react";
// import axios from "axios";
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { AuthContext } from "../context";
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'
import nf from '../nf.jpg'
import { apiUrl } from '../config'

const NavBar = () => {

  const {isAuth, setIsAuth, role, setRole, userInf, setUserInf} = useContext(AuthContext)
  // useEffect(() => {
  //   if (localStorage.getItem('token') !== null) {
  //     console.log(localStorage.getItem('token'));
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`
  //       }
  //     }
  //       setIsAuth(true)
  //       let res = axios.post('http://localhost:5000/auth/checkAuth', {}, config).catch(() => setIsAuth(false))
  //   }
  // }, [])
  const router = useNavigate()
  const logOut = () => {
    localStorage.removeItem('token')
    setRole('')
    setUserInf([])
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    setIsAuth(false)
  }

  const name = localStorage.getItem('name')
  
  
  return (
    <nav className='nav-bar'>
      <ul >
        <li >
          <Link to='/'>Фильмы</Link>
        </li>
        <li>
          {
            isAuth
            ? (<div className='user'>
                <img src={userInf.avatar ? `${apiUrl}${userInf.avatar}` : nf} alt="" className="user__avatar" />
                <h3 className='user__name' onClick={() => router(`/account/${tr(name).toLowerCase()}`)}>{name}</h3>
                <a className='user__logout' onClick={() => logOut()}>Выйти</a>
              </div>)
            : (<ul>
              <li >
                <Link to='/Login'>Войти</Link>
              </li>
              <li >
                <Link to='/Registration'>Зарегистрироваться</Link>
              </li>
            </ul>)
          }
        </li>
      </ul>
    </nav>
  )
}

export default NavBar