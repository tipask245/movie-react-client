import axios from 'axios'
import { useState, useEffect } from 'react'
import classes from './RatingForm.module.scss'

const RatingForm = ({markList, movieId, addToMarkList, updateMarkList, updateMovieRating}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [userMark, setUserMark] = useState(false)

  const marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const isMovieRated = (list, movieId) => {
    return list.find(el => String(el.id) === movieId)
  }

  
  useEffect(() => {
    setUserMark(isMovieRated(markList, movieId))
  }, [markList, movieId])
  
  const rateFilm = (value) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.post('http://localhost:5000/movie/set_rating', {
      id: movieId, 
      mark: value
    }, config)
      .then(res => {

        !userMark
        ? addToMarkList(res.data.userData)
        : updateMarkList(res.data.userData.mark, res.data.userData.id)
         
        updateMovieRating(res.data.rating)
      })
    setIsOpen(false)
  }
  
  return (
    <div className={classes.RatingForm}>
      {
        userMark &&
          <div className="rating_alredy_posted">
            <p>Ваша оценка: <span>{userMark.mark}</span></p>
          </div>
      }
      {
        isOpen
        ? <div className={classes.mark_list}>
            {
              marks.map(el => (
                <button className={classes.mark} key={el} value={el} onClick={(e) => rateFilm(e.target.value)}>{el}</button>
              ))
            }
          </div>
        : <button className={classes.open_rating_form} onClick={() => setIsOpen(true)}>Поставить оценку</button>
      }
    </div>
  )
}

export default RatingForm