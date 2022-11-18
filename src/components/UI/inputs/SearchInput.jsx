import axios from 'axios'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { transliterate as tr } from 'transliteration'
import useDebounce from '../../../hooks/useDebounce'
import { apiUrl } from '../../../config'

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
      axios.get(`${apiUrl}movie/search_movie`, {
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
        // onBlur={() => setIsFocus(false)}
      />
      {
        isFocus &&
        <div className={classes.search_results}>
        {
          // results === 'not found' &&
          //   <h4>Ничего не найдено</h4>
            isSearching(results)
            ?
              results.map(movie => (
                <div className={classes.result_movie} key={movie._id} onClick={() => router(`/${tr(movie.title).toLowerCase()}_${movie._id}`)}>
                  <img src={movie.img} />
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