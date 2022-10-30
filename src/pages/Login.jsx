import React, { useContext } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { AuthContext } from '../context'
import './Login.css'
import Input from '../components/UI/inputs/Input'

const Login = () => {

  const {setRole, setIsAuth, setUserInf, setIsUserInfLoaded} = useContext(AuthContext)
  const [login, setLogin] = useState({username: '', password: ''})
  const [notFound, setNotFound] = useState({error: '', isFound: true})
  // const {setIsAuth} = useContext(AuthContext)
  
  const loginReq = async (e) => {
    e.preventDefault()
    let res = await axios.post('http://localhost:5000/auth/login', {
      username: login.username,
      password : login.password
    }).catch((e) => {
      // console.log(e.response.data)
      setNotFound({error: e.response.data, isFound: false})
    })
    if (res && res.status === 200) {
      setNotFound({...notFound, isFound: true})
      console.log(res.data)
      localStorage.setItem('token', res.data.token)
      setRole(res.data.role[0])
      localStorage.setItem('name', res.data.userInf.username)
      localStorage.setItem('id', res.data.id)
      setIsAuth(true)
      setUserInf(res.data.userInf)
      setIsUserInfLoaded(true)
    }
    
  }

  const isFilled = () => {
    return login.username.length === 0 || login.password.length === 0
  }

  return (
    <div className='login'>
      <h1>Авторизация</h1>
      {!notFound.isFound ? <p>{notFound.error}</p>: ''}
      <form className="login_form">
        <Input 
          type="text" 
          placeholder='Имя пользователя'
          onChange={e => {
            setLogin({...login, username: e.target.value.trim()})
          }}
        />
        <Input 
          type="text" 
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

