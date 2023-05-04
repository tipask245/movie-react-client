import React from 'react'
import classes from './MovieCard.module.css'
import nf from '../../nf.jpg'
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'
import { IMovie } from '../../types/MovieCard'

const MovieCard: React.FC<IMovie> = (movie: IMovie) => {
  const router = useNavigate()

  return (
    <div
      className={classes.movie_card}
      onClick={() =>
        router(`/movie/${tr(movie.title).toLowerCase()}_${movie.id}`)
      }>
      <img
        src={movie.img ? movie.img : nf}
        alt="not-found"
        className={classes.movie_img}
      />
      <div className={classes.title_type_wrap}>
        <h3 className={classes.movie_title}>{movie.title}</h3>
        <p className={classes.movie_type}>{movie.type}</p>
      </div>
      <p className={classes.movie_desc}>{movie.content}</p>
      <p className={classes.movie_rating}>
        Оценка <span>{movie.rating}</span>
      </p>
    </div>
  )
}

export default MovieCard
