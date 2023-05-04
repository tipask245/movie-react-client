import { transliterate as tr } from 'transliteration'
import { useNavigate } from 'react-router-dom'
import classes from './AccountMovieCard.module.scss'

const AccountMovieCard = ({filmTitle, filmId, filmImg, filmRating, listName, deleteMovieInList, children}) => {
  const router = useNavigate()
  return (
    <div className={classes.account_film} onClick={e => {
      e.stopPropagation()
      router(`/movie/${tr(filmTitle).toLowerCase()}_${filmId}`)
    }}>
      <img className={classes.account_film__img} src={filmImg} alt="" />
      <div className={classes.film_info}>
        <h5 className={classes.film_info__title}>{filmTitle}</h5>
        <h5 className={classes.film_info__rating}>
          Оценка: <span>{filmRating}</span>
          
          {children}
        </h5>
      </div>
      {
        deleteMovieInList &&
        <button className={classes.account_film__delete} 
          onClick={e => {
            e.stopPropagation()
            deleteMovieInList(filmId, listName)
          }}
        >

        </button>
      }
    </div>
  )
}

export default AccountMovieCard