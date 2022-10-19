import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Movies.css'
import Modal from '../components/UI/Modals/Modal'
import CreateMovieForm from '../components/Forms/CreateMovieForm'
// import { useNavigate } from 'react-router-dom'
import { getPagesArray, getTotalPages } from '../utils/pages'
import Pagination from '../components/pagination/Pagination'
import MovieList from '../components/MovieList'
import Loader from '../components/Loaders/Loader'
// import FilterSideBar from '../components/FilterSideBar'
import { AuthContext } from '../context'
// import MovieFilter from '../components/filters/MovieFilter'

const Movies = () => {

  const {role} = useContext(AuthContext)
  const [isCreate, setIsCreate] = useState(false)
  const [movie, setMovie] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [isMovieLoading, setIsMovieLoading] = useState(true)
  // const [filter, setFilter] = useState({sort: '', search: ''})

  // const sortedMovies = useMemo(() => {
  //   console.log('getSortedPosts')
  //   if (filter.sort) {
  //     return filter.sort === 'id' ? [...movie].sort((a,b) => a[filter.sort] - b[filter.sort]) :[...movie].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
  //   }
  //   return movie
  // }, [filter.sort, movie])

  // const sortedAndSeached = useMemo(() => {
  //   return sortedMovies.filter(el => el.title.toLowerCase().includes(filter.search))
  // }, [filter.search, sortedMovies])


  useEffect(() => {
    fetchMovies(limit, page)
    setIsCreate(false)
  }, [isCreate, limit, page])

  const fetchMovies = async (limit, page) => {
    // setIsMovieLoading(true)
    const res = await axios.get('http://localhost:5000/movie/get', {
      params: {
        limit: limit,
        page: page
      }
    })
    const totalCount = res.data.totalDocs
    setTotalPages(getTotalPages(totalCount, limit))
    // console.log(totalCount)
    setMovie(res.data.docs)
    setIsMovieLoading(false)
  }
  // console.log(totalPages)
  
  const createMovie = async (newMovie) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    await axios.post('http://localhost:5000/movie/create', newMovie, config).catch((e) => {
      console.log(e.response.data)
    })
    setIsCreate(true)
    setModal(false)
  }

  const changePage = (page) => {
    setPage(page)
    fetchMovies(limit, page)
  }

  return (
    <div className="movies_wrap">
      {
        role === 'admin' &&
        <div>
        <button className='movies_create' onClick={() => setModal(true)}>Создать фильм</button>
        <Modal visible={modal} setVisible={setModal}>
          <CreateMovieForm setIsCreate={setIsCreate} createMovie={createMovie}/>
        </Modal>
      </div>
      }
      {/* <MovieFilter
        filter={filter}
        setFilter={setFilter}
      /> */}
      <div className="wrapper">
        {/* <FilterSideBar/> */}
        {
          isMovieLoading
          ? <Loader/>
          : <MovieList movie={movie}/>
        }
      </div>
      {/* {
        isMovieLoading
        ? <Loader/>
        : <MovieList movie={movie}/>
      } */}
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  )
}

export default Movies