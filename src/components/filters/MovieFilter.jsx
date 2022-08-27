import React from 'react'
import SortSelect from '../UI/selects/SortSelect'
import Input from '../UI/inputs/Input'

const MovieFilter = ({filter, setFilter}) => {
  return (
    <div className="sort_select_wrap">
        <Input
          placeholder='Поиск'
          value={filter.search}
          onChange={e => setFilter({...filter, search:e.target.value})}
        />
        <SortSelect
          value={filter.sort}
          onChange={sortPosts => setFilter({...filter, sort: sortPosts})}
          defaultValue='Сортировка по'
          options={[
            {value: 'id', name: 'По умолчанию'},
            {value: 'title', name: 'По названию'}, 
            {value: 'description', name: 'По описанию'},
          ]}
        />
      </div>
  )
}

export default MovieFilter