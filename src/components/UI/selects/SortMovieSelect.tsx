import React from 'react'
import classes from './SortMovieSelect.module.scss'

interface OptionsValue {
  value: string;
  name: string;
}

interface SelectProps {
  options: Array<OptionsValue>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sortSelect: string;
}

const SortMovieSelect: React.FC<SelectProps> = ({options, setSort, sortSelect}) => {
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