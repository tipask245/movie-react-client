import React from 'react'
import classes from './WatchButtons.module.scss'

const WillWatchButton = (props, {butStl}) => {
  return (
    <div className={classes.button_wrap}>
      <button {...props} className={classes.will_watch_button}>
        <svg width="25" height="33" viewBox="0 0 25 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path style={butStl} d="M0 1C0 0.447715 0.447715 0 1 0H24C24.5523 0 25 0.447715 25 1V31.8795C25 32.8524 23.7517 33.2524 23.1863 32.4608L13.3137 18.6392C12.9149 18.0809 12.0851 18.0809 11.6863 18.6392L1.81373 32.4608C1.24828 33.2524 0 32.8524 0 31.8795V1Z" fill="white"/>
        </svg>
      </button>
      <p>Буду смотреть</p>
    </div>
  )
}

export default WillWatchButton