import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import Input from './UI/inputs/Input'
import classes from './CreateReviewForm.module.css'

const CreateReviewForm = ({createReview}) => {

  const params = useParams()
  const [reviewInp, setReviewInp] = useState({
    title: '',
    review: ''
  })

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
        reviewTitle: reviewInp.title,
        reviewBody: reviewInp.review
      }
    }
    createReview(data)
    setReviewInp({
      title: '',
      review: ''
    })
  }

  return (
    <form className={classes.movie_review_form}>
      <h3 className={classes.movie_review_title}>Написать рецензию</h3>
      
        <Input placeholder='Заголовок' onChange={(e) => setReviewInp({...reviewInp, title: e.target.value})}/>
        <textarea placeholder='Рецензия' onChange={(e) => setReviewInp({...reviewInp, review: e.target.value})}/>
      
      <button onClick={addReview}>Создать</button>
    </form>
  )
}

export default CreateReviewForm