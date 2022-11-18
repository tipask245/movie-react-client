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
// import FilterSideBar from '../components/FilterSideBar'
import { AuthContext } from '../context'
import useDebounce from '../hooks/useDebounce'
import SearchInput from '../components/UI/inputs/SearchInput'
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
  // const [searchValue, setSearchValue] = useState('')
  // const [isSearching, setIsSearching] = useState(false)
  // const debounceSearch = useDebounce(searchValue, 500)
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search])

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
  if (location.search !== '') { 

  }

  useEffect(() => {
    console.log('useEffect');
    if (location.search !== '') {
      let params = location.search.split('&')
      let paramsValues = params[0].split('=')[1]
      setPage(Number(paramsValues))
      fetchMovies(limit, Number(paramsValues))
      setIsCreate(false)
    } else {
      setPage(1)
      fetchMovies(limit, 1)
      setIsCreate(false)
    }
  }, [limit, location.search])

  const fetchMovies = async (limit, page) => {
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
    if (page === 1) {
      navigate('/')
    } else {
      urlParams.set("page", page.toString())
      console.log(urlParams);
      updateURL()
    }
  }

  return (
    <div className="movies_wrap">
      {/* <input type="text" className="search_movie" placeholder='Поиск...'/> */}
      <SearchInput/>
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
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  )
}

export default Movies