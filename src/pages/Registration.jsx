import { useState } from 'react'
import './Registration.scss'
import Input from '../components/UI/inputs/Input'
import movieAPI from '../api/movieAPI'

const Registration = () => {

  const [registration, setRegistration] = useState({username: '', password: ''})
  const [notFound, setNotFound] = useState({error: '', isFound: false})

  const [isSuccess, setIsSuccess] = useState(false)

  const registrationReq = (e) => {
    e.preventDefault()
    movieAPI.post('/auth/registration', registration)
    .then(() => {
      setIsSuccess(true)
      setNotFound({error: '', isFound: false})
    })
    .catch((e) => {
      console.log(e.response.data)
      setNotFound({error: e.response.data, isFound: true})
    })
  }

  const isFilled = () => {
    return registration.username.length === 0 || registration.password.length === 0
  }

  return (
    <div className='registration'>
      <h1>Регистрация</h1>
      <form className="registration_form">
      { notFound.isFound ? <p>{notFound.error}</p> : ''}
      {
        isSuccess &&
        <p className='success'>Пользователь успешно зарегистрирован</p>
      }
        <Input 
          type="text" 
          placeholder='Имя пользователя'
          onChange={e => {
            setRegistration({...registration, username: e.target.value.trim()})
          }}
        />
        <Input 
          type="text" 
          placeholder='Пароль'
          onChange={e => {
            setRegistration({...registration, password: e.target.value.trim()})
          }}
        />
        <button className="form_button" disabled={isFilled()} onClick={registrationReq}>Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Registration