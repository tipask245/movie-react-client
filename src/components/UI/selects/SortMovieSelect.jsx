import React from 'react'
import classes from './SortMovieSelect.module.scss'

const SortMovieSelect = ({options, setSort, sortSelect}) => {
  return (
    <select 
      className={classes.sort_movie_select}
      onChange={e => setSort(e.target.value)} //вписать функцию на изменение юрл параметров (функция в юзеффект)
      value={sortSelect}
    >
      <option disabled value=''>Сортировка по</option>
      {options.map(el =>
        <option key={el.value} value={el.value}>{el.name}</option>
      )}
    </select>
  )
}

export default SortMovieSelect