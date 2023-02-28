import React from 'react'
import classes from './FilterSideBar.module.css'
import SearchInput from './UI/inputs/SearchInput'
import SortMovieSelect from './UI/selects/SortMovieSelect'

interface ISideBarProps {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sortSelect: string;
}

const FilterSideBar: React.FC<ISideBarProps> = ({setSort, sortSelect}) => {
  return (
    <div className={classes.filter_side_bar}>
      <SearchInput />
      <SortMovieSelect 
        options={[
          {value: 'default', name: 'По умолчанию'},
          {value: 'asc', name: 'По алфавиту'},
          {value: 'rating-asc', name: 'Оценка по возрастанию'},
          {value: 'rating-desc', name: 'Оценка по убыванию'}
        ]}
        setSort={setSort}
        sortSelect={sortSelect}
      />
    </div>
  )
}

export default FilterSideBar