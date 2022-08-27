import React from 'react'
import classes from './SortSelect.module.css'

const SortSelect = ({options , defaultValue, value, onChange}) => {
  return (
    <select 
      className={classes.sort_select}
      onChange={ev => onChange(ev.target.value)}
    >
      <option disabled value=''>Сортировка по</option>
      {options.map(el =>
        <option key={el.value} value={el.value}>{el.name}</option>
      )}
    </select>
  )
}

export default SortSelect