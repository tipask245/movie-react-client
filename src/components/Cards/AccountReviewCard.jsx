import React from 'react'
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'

const AccountReview = ({filmImg, filmTitle, filmRating, reviewTitle, reviewBody, _id}) => {
  const router = useNavigate()
  return (
    <div className='account_review'>
      <div className="account_film" onClick={(e) => {
        // e.stopPropagation()
        router(`/${tr(filmTitle).toLowerCase()}_${_id}`)
      }}>
        <img className="account_film__img" src={filmImg} alt="" />
        <div className="film_info">
          <h5 className="film_info__title">{filmTitle}</h5>
          <h5 className="film_info__rating">Оценка: <span>{filmRating}</span></h5>
        </div>
      </div>
      <div className='review_info'>
        <h4 className="review_info__title">{reviewTitle}</h4>
        <p className="review_info__body">{reviewBody}</p>
      </div>
    </div>
  )
}

export default AccountReview