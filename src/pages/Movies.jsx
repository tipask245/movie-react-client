import React, { useContext, useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import './Movies.scss'
import Modal from '../components/UI/Modals/Modal'
import CreateMovieForm from '../components/Forms/CreateMovieForm'
import { useNavigate, useLocation } from 'react-router-dom'
import { getTotalPages } from '../utils/pages'
import Pagination from '../components/pagination/Pagination'
import MovieList from '../components/MovieList'
import Loader from '../components/Loaders/Loader'
import FilterSideBar from '../components/FilterSideBar'
import { AuthContext } from '../context'

const Movies = () => {

  const {role} = useContext(AuthContext)
  const [isCreate, setIsCreate] = useState(false)
  const [movie, setMovie] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [isMovieLoading, setIsMovieLoading] = useState(true)
  const [sortSelect, setSortSelect] = useState('default')
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search])

  if (location.search !== '') { 

  }

  useEffect(() => {
    console.log('useEffect');
    const parameters = {page: 1, limit}
    if (urlParams.toString() === '') {
      setPage(1)
      setSortSelect('default')
      setIsCreate(false)
    }
    if (urlParams.has('page')) {
      let paramValue = urlParams.get('page')
      // console.log(paramValue);
      setPage(Number(paramValue))
      parameters['page'] = Number(paramValue)
      setIsCreate(false)
    } 
    if (urlParams.has('sort')) { //dopisat
      console.log('хуй пизда')
      let paramValue = urlParams.get('sort')
      console.log(urlParams.get('sort'))
      setSortSelect(paramValue)
      parameters['sort'] = paramValue
      setIsCreate(false)
    } 
    fetchMovies(parameters)
  }, [limit, location.search])

  const fetchMovies = async (parameters) => {
    const res = await axios.get('http://localhost:5000/movie/get', {
      params: parameters
    })
    const totalCount = res.data.totalDocs
    setTotalPages(getTotalPages(totalCount, limit))
    // console.log(totalCount)
    setMovie(res.data.docs)
    setIsMovieLoading(false)
    console.log(res.data.docs);
  }
  // console.log(totalPages)
  const createMovie = (newMovie) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    axios.post('http://localhost:5000/movie/create', newMovie, config).catch((e) => {
      console.log(e.response.data)
    })
    setIsCreate(true)
    setModal(false)
  }

  const updateURL = () => {
    navigate({
      pathname: location.pathname,
      search: `?${urlParams}`,
    })
  }

  const changePage = (page) => {
    setPage(page)
    if (page === 1 && sortSelect === 'default') {
      navigate('/')
    } else {
      urlParams.set("page", page.toString())
      console.log(urlParams)
      updateURL()
    }
  }

  const setSort = (sort) => {
    // setSortSelect(sort)
    if (sort === 'default') {
      navigate('/')
    } else {
      setSortSelect(sort)
      urlParams.set("sort", sort)
      console.log(urlParams)
      updateURL()
    }
  }

  return (
    <div className="movies_wrap">
      <FilterSideBar setSort={setSort} sortSelect={sortSelect} />
      {
        role === 'admin' &&
        <div>
          <button className='movies_create' onClick={() => setModal(true)}>Создать фильм</button>
          <Modal visible={modal} setVisible={setModal}>
            <CreateMovieForm setIsCreate={setIsCreate} createMovie={createMovie}/>
          </Modal>
        </div>
      }
      <div className="wrapper">
        {
          isMovieLoading
          ? <Loader/>
          : <MovieList movie={movie}/>
        }
      </div>
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  )
}

export default Movies