import React, { useContext } from "react";
// import axios from "axios";
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { AuthContext } from "../context";
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'
import nf from '../nf.jpg'
import { apiUrl } from '../config'
import { logOut } from "../utils/LogOut"

const NavBar = () => {

  const {isAuth, setIsAuth, setRole, userInf, setUserInf, setIsUserInfLoaded} = useContext(AuthContext)
  const router = useNavigate()
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
                <button className='user__logout' onClick={() => logOut(setRole, setUserInf, setIsUserInfLoaded, setIsAuth)}>Выйти</button>
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