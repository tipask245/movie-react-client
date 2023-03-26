import React from 'react'
import { getPagesArray } from '../../utils/pages'
import classes from './Pagination.module.css'

interface IPagination {
  totalPages: number,
  page: number, 
  changePage:  React.Dispatch<React.SetStateAction<number>>
}

const Pagination: React.FC<IPagination> = ({totalPages, page, changePage}: IPagination) => {

  const pagesArray = getPagesArray(totalPages)

  return (
    <div className={classes.pagination_wrap}>
      {pagesArray.map(p =>
        <button 
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0
            })
            changePage(p)
          }}
          className={page === p ? [classes.pagination_button, classes.page__active].join(' ') : classes.pagination_button}
          key={p}
        >
          {p}
        </button>
      )}
    </div>
  )
}

export default Pagination