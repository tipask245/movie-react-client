import React from 'react'
import AccountMovieCard from './AccountMovieCard'

const AccountReview = ({filmImg, filmTitle, filmRating, reviewTitle, reviewBody, deleteReview, filmId, reviewId}) => {
  return (
    <div className='account_review'>
      <AccountMovieCard 
        filmTitle={filmTitle} 
        filmId={filmId}
        filmImg={filmImg}
        filmRating={filmRating}
      />
      <div className='review_info'>
        <div className="review_info__column">
          <h4 className="review_info__title">{reviewTitle}</h4>
          <p className="review_info__body">{reviewBody}</p>
        </div>
        <button className="review_info__delete" onClick={() => deleteReview(reviewId)}>
        </button>
      </div>
    </div>
  )
}

export default AccountReview