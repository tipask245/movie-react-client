import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Input from '../UI/inputs/Input'
import classes from './CreateReviewForm.module.css'

const CreateReviewForm = ({createReview, movieImg}) => {

  const params = useParams()
  const [reviewInp, setReviewInp] = useState({title: '', review: ''})

  // let data = {
  //   id: params.title.split('_')[1],
  //   review: {
  //     name: localStorage.getItem('name'),
  //     reviewTitle: reviewInp.title,
  //     reviewBody: reviewInp.review
  //   }
  // }

  const addReview = (e) => {
    e.preventDefault()
    let data = {
      id: params.title.split('_')[1],
      review: {
        name: localStorage.getItem('name'),
        movieImg,
        reviewTitle: reviewInp.title,
        reviewBody: reviewInp.review
      }
    }
    createReview(data)
    setReviewInp({title: '', review: ''})
    // setReviewInp({
    //   title: '',
    //   review: ''
    // })
    // reviewInp
  }

  const isFilled = () => {
    return reviewInp.title.length === 0 || reviewInp.review.length === 0
  }

  return (
    <form className={classes.movie_review_form}>
      <h3 className={classes.movie_review_title}>Написать рецензию</h3>
      
        <Input placeholder='Заголовок' value={reviewInp.title} onChange={(e) => setReviewInp({...reviewInp, title: e.target.value})}/>
        <textarea placeholder='Рецензия' value={reviewInp.review} onChange={(e) => setReviewInp({...reviewInp, review: e.target.value})}/>
      
      <button onClick={addReview} disabled={isFilled()}>Создать</button>
    </form>
  )
}

export default CreateReviewForm