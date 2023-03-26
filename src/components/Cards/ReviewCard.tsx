import React from 'react'
import classes from './ReviewCard.module.css'

interface IReviewCard {
  username: string, 
  title: string, 
  body: string
}

const ReviewCard: React.FC<IReviewCard> = ({username, title, body}: IReviewCard) => {
  return (
    <div className={classes.review_card}>
      <h5 className={classes.review_username}>{username}</h5>
      <h4 className={classes.review_title}>{title}</h4>
      <p className={classes.review_body}>{body}</p>
    </div>
  )
}

export default ReviewCard