import React, { useContext, useState } from 'react'
import { AuthContext } from '../context'
import './Login.scss'
import Input from '../components/UI/inputs/Input'
import movieAPI from '../api/movieAPI'

const Login = () => {
  const {setRole, setIsAuth, setUserInf, setIsUserInfLoaded} = useContext(AuthContext)
  const [login, setLogin] = useState({username: '', password: ''})
  const [notFound, setNotFound] = useState({error: '', isFound: true})
  // const {setIsAuth} = useContext(AuthContext)
  
  const loginReq = (e) => {
    e.preventDefault()
    movieAPI.post('/auth/login', {
      username: login.username,
      password : login.password
    })
    .then(res => {
      setNotFound({...notFound, isFound: true})
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.userInf.username)
      localStorage.setItem('id', res.data.id)
      setRole(res.data.role[0])
      setIsAuth(true)
      setUserInf(res.data.userInf)
      setIsUserInfLoaded(true)
    })
    .catch((e) => {
      setNotFound({error: e.response.data, isFound: false})
    })
  }

  const isFilled = () => {
    return login.username.length === 0 || login.password.length === 0
  }

  return (
    <div className='login'>
      <h1>Авторизация</h1>
      {
        !notFound.isFound && 
          <p>{notFound.error}</p>
      }
      <form className="login_form">
        <Input 
          type="text" 
          placeholder='Имя пользователя'
          onChange={e => {
            setLogin({...login, username: e.target.value.trim()})
          }}
        />
        <Input 
          type="password" 
          placeholder='Пароль'
          onChange={e => {
            setLogin({...login, password: e.target.value.trim()})
          }}
        />
        <button className="form_button" disabled={isFilled()} onClick={loginReq}>Войти</button>
      </form>
    </div>
  )
}

export default Login

