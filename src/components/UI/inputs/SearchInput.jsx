import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'
import useDebounce from '../../../hooks/useDebounce'
import movieAPI from '../../../api/movieAPI'

import classes from './SearchInput.module.scss'

const SearchInput = () => {

  const [searchValue, setSearchValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [results, setResults] = useState([])
  const rootEl = useRef(null)
  const debounceSearch = useDebounce(searchValue, 700)
  const router = useNavigate()

  useEffect(() => {
    if (debounceSearch) {
      console.log('vvod');
      movieAPI.get('/movie/search_movie', {
        params: {
          search: searchValue
        }
      }).then(res => {
        setResults(res.data)
      })
    } else {
      setResults([])
    }
  }, [debounceSearch])

  useEffect(() => {
    const onClick = e => rootEl.current.contains(e.target) || setIsFocus(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [])

  const isSearching = (results) => {
    return results instanceof Array
  }

  return (
    <div className={classes.search_movie}  ref={rootEl}>
      <input 
        type="text" 
        className={classes.search_movie__input} 
        placeholder='Поиск...' 
        onChange={e => setSearchValue(value => value = e.target.value)}
        onFocus={() => setIsFocus(true)}
      />
      {
        isFocus &&
        <div className={classes.search_results}>
        {
            isSearching(results)
            ?
              results.map(movie => (
                <div className={classes.result_movie} key={movie.id} onClick={() => router(`/movie/${tr(movie.title).toLowerCase()}_${movie.id}`)}>
                  <img src={movie.img} alt={movie.title} />
                  <div className={classes.info_wrap}>
                    <h5 className={classes.result_movie__title}>{movie.title}</h5>
                    <h5 className={classes.result_movie__rating}>Оценка: <span>{movie.rating}</span></h5>
                  </div>
                </div>
              ))
            : <p>Ничего не найдено</p>
        }
        </div>
      }
    </div>
  )
}

export default SearchInput