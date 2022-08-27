import React from 'react'
import { getPagesArray } from '../../utils/pages'
import classes from './Pagination.module.css'
import { animateScroll as scroll } from 'react-scroll'

const Pagination = ({totalPages, page, changePage}) => {

  const pagesArray = getPagesArray(totalPages)

  return (
    <div className={classes.pagination_wrap}>
      {pagesArray.map(p =>
        <button 
          onClick={() => {
            scroll.scrollToTop()
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