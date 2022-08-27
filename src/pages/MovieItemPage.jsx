import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './MovieItemPage.css'
import CreateReviewForm from '../components/CreateReviewForm'
import { AuthContext } from '../context'
import ReviewCard from '../components/ReviewCard'

const MovieItemPage = () => {

  const {isAuth} = useContext(AuthContext)
  const params = useParams()
  const [movie, setMovie] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    fetchMovieById()
  },[])

  const fetchMovieById = async () => {
    let res = await axios.get(`http://localhost:5000/movie/get_byid/${params.title.split('_')[1]}`)
      .then((result) => {
        setIsLoaded(true)
        setMovie(result.data[0])
      })
  }

  const createReview = async (data) => {
    await axios.post('http://localhost:5000/movie/create_review', data)
  }

  console.log(isLoaded)
  console.log(movie.review, movie.title );
  return (
    <div className='movie_item_container'>
      <div className="movie_item">
        <img src={movie.img} alt={movie.title} className="movie_img" />
        <div className="movie_inf_wrapper">
          <div className="movie_title_wrap">
            <h1 className="movie_title">{movie.title}</h1>
            <p className="movie_item_type">{movie.type}</p>
          </div>
          <p className="movie_item_desc">{movie.desc}</p>
          <h4 className="movie_item_rating">Оценка: <span>{movie.rating}</span></h4>
        </div>
      </div>
      {
        isAuth
        ? <CreateReviewForm createReview={createReview}/>
        : <h4 className='auth_to_review'>Для написания рецензии вам нужно авторизоваться</h4>
      }
      
      <div className="movie_review">
        <h2>Рецензии: </h2>
        {
          isLoaded &&
            movie.review.length !== 0
            ? movie.review.map((el, ind) => (
              <ReviewCard 
                username={el.name}
                title={el.reviewTitle}
                body={el.reviewBody}
              />
            ))
            : <h4 className='review_nf'>Рецензий пока нет</h4>
        }
        
      </div>
    </div>
  )
}

export default MovieItemPage