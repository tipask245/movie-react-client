import React, { useState } from 'react'
import './Registration.css'
import Input from '../components/UI/inputs/Input'
import axios from 'axios'

const Registration = () => {

  const [registration, setRegistration] = useState({username: '', password: ''})
  const [notFound, setNotFound] = useState({error: '', isFound: true})

  const [isSuccess, setIsSuccess] = useState(false)

  const registrationReq = async (e) => {
    e.preventDefault()
    let res = await axios.post('http://localhost:5000/auth/registration', registration).then(() => setIsSuccess(true)).catch((e) => {
      console.log(e.response.data)
      setNotFound({error: e.response.data, isFound: false})
    })
  }

  const isFilled = () => {
    return registration.username.length === 0 || registration.password.length === 0
  }

  return (
    <div className='registration'>
      <h1>Регистрация</h1>
      <form className="registration_form">
      <p>{ !notFound.isFound ? notFound.error : ''}</p>
      {
        isSuccess &&
        <p className='success'>Пользователь успешно зарегистрирован</p>
      }
        <Input 
          type="text" 
          placeholder='Имя пользователя'
          onChange={e => {
            setRegistration({...registration, username: e.target.value})
          }}
        />
        <Input 
          type="text" 
          placeholder='Пароль'
          onChange={e => {
            setRegistration({...registration, password: e.target.value})
          }}
        />
        <button className="form_button" disabled={isFilled()} onClick={registrationReq}>Войти</button>
      </form>
    </div>
  )
}

export default Registration