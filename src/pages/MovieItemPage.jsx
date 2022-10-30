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
  const {isAuth, userInf, setUserInf, isUserInfLoaded} = useContext(AuthContext)
  const params = useParams()
  const [movie, setMovie] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useNavigate()
  const movieId = params.title.split('_')[1]

  const movieInList = (list, movieId) => {
    if (list.length > 0) {
      let filtered = list.filter((el) => el.filmId === movieId)
      return filtered.length > 0
    } else {
      return false
    }
  }

  let isMovieInWatched, isMovieInWillWatched

  if (isUserInfLoaded && (userInf.watched.length > 0 || userInf.willWatch.length > 0)) {
    isMovieInWatched = movieInList(userInf.watched, movieId)
    isMovieInWillWatched = movieInList(userInf.willWatch, movieId)
    console.log(isMovieInWatched, isMovieInWillWatched);
  }

  // const fetchMovieById = (movieId, isAuth) => {
  //   axios.get(`http://localhost:5000/movie/get_byid/${movieId}/${isAuth}`)
  //     .then(result => {
  //       if (result.data === '') {
  //         router('/404')
  //       }
  //       setMovie(result.data[0])
  //       setIsLoaded(true)
  //     })
  // }

  useEffect(() => {
    const fetchMovieById = (movieId, isAuth) => {
      axios.get(`http://localhost:5000/movie/get_byid/${movieId}/${isAuth}`)
        .then(result => {
          if (result.data === '') {
            router('/404')
          }
          setMovie(result.data[0])
          setIsLoaded(true)
        })
    }
    fetchMovieById(movieId, isAuth)
    console.log("useEffect render")
  }, [])

  const createReview = data => {
    axios.post('http://localhost:5000/movie/create_review', data)
    .then(result => {
      setMovie({...movie, reviews: result.data})
    })
    console.log("render")
  }

  const addInList = async (name) => {
    const data = {
      id: params.title.split('_')[1],
      name: localStorage.getItem('name'),
      rating: movie.rating,
      listName: name
    }
    const res = await axios.post(`http://localhost:5000/movie/add_in_list`, data)
    setUserInf({...userInf, [name]: res.data})
  }

  const removeFromList = async (name) => {
    const data = {
      id: params.title.split('_')[1],
      name: localStorage.getItem('name'),
      rating: movie.rating,
      listName: name
    }
    const res = await axios.post(`http://localhost:5000/movie/remove_from_list`, data)
    setUserInf({...userInf, [name]: res.data})
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
            isAuth && isUserInfLoaded
              ? <>
                  <WillWatchButton onClick={() => isMovieInWillWatched ? removeFromList('willWatch') : addInList('willWatch')} isMovieInWillWatched={isMovieInWillWatched}/> 
                  <WatchedButton onClick={() => isMovieInWatched ? removeFromList('watched') : addInList('watched')} isMovieInWatched={isMovieInWatched}/>
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
      
      <div className="movie_reviews">
        <h2>Рецензии: </h2>
        {
          isLoaded &&
            movie.reviews.length !== 0
            ? movie.reviews.map((el, ind) => (
              <ReviewCard 
                key={el._id}
                username={el.name}
                title={el.reviewTitle}
                body={el.reviewBody}
              />
            ))
            : <h4 className='reviews_nf'>Рецензий пока нет</h4>
        }
        
      </div>
    </div>
  )
}

export default MovieItemPage