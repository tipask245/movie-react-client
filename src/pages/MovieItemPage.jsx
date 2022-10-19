import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './MovieItemPage.scss'
import CreateReviewForm from '../components/Forms/CreateReviewForm'
import { AuthContext } from '../context'
import ReviewCard from '../components/Cards/ReviewCard'
import WillWatchButton from '../components/UI/buttons/WillWatchButton'
import WatchedButton from '../components/UI/buttons/WatchedButton'

const MovieItemPage = () => {

  const {isAuth, userInf, setUserInf} = useContext(AuthContext)
  const params = useParams()
  const [movie, setMovie] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useNavigate()

  const fetchMovieById = async () => {
    await axios.get(`http://localhost:5000/movie/get_byid/${params.title.split('_')[1]}/${isAuth}`)
      .then((result) => {
        if (result.data === '') {
          router('/404')
        }
        setMovie(result.data[0])
        setIsLoaded(true)
      })
      // .catch(e => {
      //   console.log(e);
      //   router('/404')
      // })
      // if (res === undefined) {
      //   router('/404')
      // }
  }

  useEffect(() => {
    fetchMovieById()
  }, [])

  const createReview = async (data) => {
    await axios.post('http://localhost:5000/movie/create_review', data)
  }

  const addWatchList = async (adress) => {
    const data = {
      id: params.title.split('_')[1],
      name: localStorage.getItem('name'),
      rating: movie.rating
    }
    await axios.post(`http://localhost:5000/movie/${adress}`, data)
  }

  // const buttonStyle = (type) => {
  //   userInf.userInf[type].forEach((el) => {
  //     // console.log(el)
  //     if (movie._id === el.filmId) {
  //       return {fill: 'brown'}
  //       console.log(123);
  //     } 
  //   })
  // }

  // console.log(isLoaded)
  // console.log(movie.review, movie.title );
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
          {
            isAuth
              ? <>
                  <WillWatchButton onClick={() => addWatchList('set_will_watch')}/> 
                  <WatchedButton onClick={() => addWatchList('set_watched')}/>
                </>
              : <h4 className='need_to_auth'>Для оценки фильма вам нужно авторизоваться</h4>
          }
        </div>
      </div>
      {
        isAuth
        ? <CreateReviewForm createReview={createReview} movieImg={movie.img}/>
        : <h4 className='need_to_auth'>Для написания рецензии вам нужно авторизоваться</h4>
      }
      
      <div className="movie_review">
        <h2>Рецензии: </h2>
        {
          isLoaded &&
            movie.review.length !== 0
            ? movie.review.map((el, ind) => (
              <ReviewCard 
                key={el._id}
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