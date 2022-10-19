import React, { useState } from 'react'
import classes from './CreateMovieForm.module.css'
import Input from '../UI/inputs/Input'

const CreateMovieForm = ({setIsCreate, createMovie}) => {

  const [movieInp, setMovieInp] = useState({
    img: '',
    title: '',
    type: '',
    desc: '',
    rating: ''
  })

  const addMovie = (e) => {
    e.preventDefault()
    createMovie(movieInp)
    setMovieInp({
      img: '',
      title: '',
      type: '',
      desc: '',
      rating: ''
    })
  }

  return (
    <div className={classes.create_movie_form}>
        <Input type="text" placeholder='Ссылка на изображение' value={movieInp.img} onChange={e => setMovieInp({...movieInp, img: e.target.value})}/>
        <Input type="text" placeholder='Название' value={movieInp.title} onChange={e => setMovieInp({...movieInp, title: e.target.value})}/>
        <Input type="text" placeholder='Тип' value={movieInp.type} onChange={e => setMovieInp({...movieInp, type: e.target.value})}/>
        <textarea name="" id="" cols="30" rows="10" placeholder='Описание' value={movieInp.desc} onChange={e => setMovieInp({...movieInp, desc: e.target.value})}></textarea>
        <Input type="number" min='0' max='10' placeholder='Оценка' value={movieInp.rating} onChange={e => setMovieInp({...movieInp, rating: e.target.value})}/>
        <button onClick={addMovie}>Создать фильм</button>
      </div>
  )
}

export default CreateMovieForm