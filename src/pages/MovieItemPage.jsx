import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import './MovieItemPage.scss'
import CreateReviewForm from '../components/Forms/CreateReviewForm'
import { AuthContext } from '../context'
import ReviewCard from '../components/Cards/ReviewCard'
import WillWatchButton from '../components/UI/buttons/WillWatchButton'
import WatchedButton from '../components/UI/buttons/WatchedButton'
import RatingForm from '../components/Forms/RatingForm'


const MovieItemPage = () => {
  // console.log('render');
  const {setRole, setIsAuth, isAuth, userInf, setUserInf, isUserInfLoaded} = useContext(AuthContext)
  const params = useParams()
  const [movie, setMovie] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useNavigate()
  const movieId = params.title.split('_')[1]
  const [isMovieInWatched, setIsMovieInWatched] = useState(false)
  const [isMovieInWillWatched, setIsMovieInWillWatched] = useState(false)

  const movieInList = (list, movieId) => {
    if (list.length > 0) {
      let filtered = list.filter((el) => String(el.id) === movieId)
      return filtered.length > 0
    } else {
      return false
    }
  }

  useEffect(() => {
    const fetchMovieById = (movieId, isAuth) => {
      axios.get(`http://localhost:5000/movie/get_byid/${movieId}/${isAuth}`)
        .then(result => {
          if (result.data === '') {
            router('/404')
          }
          setMovie(result.data)
          setIsLoaded(true)
          console.log(result.data);
        })
    }
    fetchMovieById(movieId, isAuth)
    // console.log("useEffect render")
    
  }, [])
  
  useEffect(() => {
    if (isUserInfLoaded) {
      setIsMovieInWatched(movieInList(userInf.watched, movieId))
      setIsMovieInWillWatched(movieInList(userInf.will_watch, movieId))
      console.log(isMovieInWatched, isMovieInWillWatched);
    }
  }, [userInf, isUserInfLoaded])

  const createReview = data => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    axios.post('http://localhost:5000/movie/create_review', data, {headers})
    .then(result => {
      setMovie({...movie, reviews: [...movie.reviews, result.data.filmData]})
      setUserInf({...userInf, reviews: [...userInf.reviews.reverse(), result.data.userData].reverse()})
    })
    console.log("render")
  }

  const addInList = async (name) => {
    const data = {
      id: params.title.split('_')[1],
      rating: movie.rating,
      listName: name
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    const res = await axios.post(`http://localhost:5000/movie/add_in_list`, data, {headers})
    setUserInf({...userInf, [name]: res.data})
  }

  const removeFromList = async (name) => {
    const data = {
      id: params.title.split('_')[1],
      username: localStorage.getItem('name'),
      rating: movie.rating,
      listName: name
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    await axios.delete(`http://localhost:5000/movie/remove_from_list`, {headers, data})
    setUserInf({...userInf, [name]: [...userInf[name].filter(el => String(el.id) !== data.id)]})
  }

  const addToMarkList = (mark) => {
    setUserInf({...userInf, marks: [...userInf.marks.reverse(), mark].reverse()})
  }

  const updateMarkList = (mark, filmId) => {
      setUserInf({...userInf, marks: [...userInf.marks.map(el => el.id === filmId ? {...el, mark} : el)]})
  }

  const updateMovieRating = (rating) => {
    console.log(rating);
    setMovie({...movie, rating})
  }

  return (
    <div className='movie_item_container'>
    {
      isLoaded && 
      <div className="movie_item">
        <img src={movie.img} alt={movie.title} className="movie_img" />
        <div className="movie_inf_wrapper">
          <div className="movie_title_wrap">
            <h1 className="movie_title">{movie.title}</h1>
            <p className="movie_item_type">{movie.type}</p>
          </div>
          <p className="movie_item_desc">{movie.content}</p>
          <h4 className="movie_item_rating">Оценка: <span>{movie.rating}</span></h4>
        
          {
            isAuth && isUserInfLoaded
              ? <>
                  <RatingForm 
                    movieId={movieId} 
                    markList={userInf.marks} 
                    addToMarkList={addToMarkList}
                    updateMarkList={updateMarkList}
                    updateMovieRating={updateMovieRating}
                  />
                  <WillWatchButton onClick={() => isMovieInWillWatched ? removeFromList('will_watch') : addInList('will_watch')} isMovieInWillWatched={isMovieInWillWatched}/> 
                  <WatchedButton onClick={() => isMovieInWatched ? removeFromList('watched') : addInList('watched')} isMovieInWatched={isMovieInWatched}/>
                </>
              : <h4 className='need_to_auth'>Для оценки фильма вам нужно авторизоваться</h4>
          }
        </div>
      </div>
}
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
            ? movie.reviews.map(el => (
              <ReviewCard 
                key={el.id}
                username={el.username}
                title={el.title}
                body={el.body}
              />
            ))
            : <h4 className='reviews_nf'>Рецензий пока нет</h4>
        }
        
      </div>
    
    </div>
  )
}

export default MovieItemPage