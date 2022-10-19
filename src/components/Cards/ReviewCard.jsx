import React from 'react'
import classes from './ReviewCard.module.css'

const ReviewCard = ({username, title, body}) => {
  return (
    <div className={classes.review_card}>
      <h5 className={classes.review_username}>{username}</h5>
      <h4 className={classes.review_title}>{title}</h4>
      <p className={classes.review_body}>{body}</p>
    </div>
  )
}

export default ReviewCard