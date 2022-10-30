import React from 'react'
// import { useNavigate } from 'react-router-dom'
import AccountMovieCard from './AccountMovieCard'

const AccountReview = ({filmImg, filmTitle, filmRating, reviewTitle, reviewBody, deleteReview, filmId, reviewId}) => {
  return (
    <div className='account_review'>
      {/* <div className="account_film" onClick={(e) => {
        // e.stopPropagation()
        router(`/${tr(filmTitle).toLowerCase()}_${_id}`)
      }}>
        <img className="account_film__img" src={filmImg} alt="" />
        <div className="film_info">
          <h5 className="film_info__title">{filmTitle}</h5>
          <h5 className="film_info__rating">Оценка: <span>{filmRating}</span></h5>
        </div>
      </div> */}
      <AccountMovieCard 
        filmTitle={filmTitle} 
        _id={filmId}
        filmImg={filmImg}
        filmRating={filmRating}
      />
      <div className='review_info'>
        <div className="review_info__column">
          <h4 className="review_info__title">{reviewTitle}</h4>
          <p className="review_info__body">{reviewBody}</p>
        </div>
        <button className="review_info__delete" onClick={() => deleteReview(filmId, reviewId)}>
        </button>
      </div>
    </div>
  )
}

export default AccountReview