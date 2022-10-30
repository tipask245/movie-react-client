import React from 'react'
import classes from './WatchButtons.module.scss'

const WatchedButton = ({isMovieInWatched, ...props}) => {
  return (
    <div className={classes.button_wrap}>
      <button {...props} className={classes.watched_button} style={isMovieInWatched ? {backgroundColor: 'brown'} : null}>
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.2138 8.91328C35.2024 9.91274 36.2812 10.9586 37.5333 11.9903C36.0323 13.1918 34.7998 14.3591 33.7117 15.4465C33.248 15.9099 32.8215 16.347 32.417 16.7616C31.5264 17.6742 30.7425 18.4774 29.9041 19.2114C28.7313 20.238 27.5433 21.0392 26.0437 21.5964C24.535 22.157 22.6312 22.5 20 22.5C14.9047 22.5 11.7394 20.7577 9.08419 18.4812C7.9285 17.4904 6.88319 16.411 5.78941 15.2815C5.58738 15.0729 5.3837 14.8626 5.17736 14.6508C4.31257 13.7631 3.40839 12.858 2.42394 12.0089C3.536 11.0732 4.52612 10.0971 5.4549 9.15052C5.72586 8.87435 5.98993 8.60255 6.24959 8.33529C7.29605 7.25817 8.27089 6.25477 9.33688 5.33645C11.8932 3.13425 14.8891 1.5 20 1.5C25.1315 1.5 27.9238 3.00602 30.3615 5.1188C31.3302 5.95835 32.2256 6.87759 33.2119 7.89008C33.5343 8.22102 33.8663 8.56193 34.2138 8.91328Z" stroke="black" strokeWidth="3"/>
          <circle cx="20" cy="12" r="8" fill="black"/>
          <circle cx="16.5" cy="8.5" r="2.5" fill="white"/>
        </svg>
      </button>
      <p>Просмотрено</p>
    </div>
  )
}

export default WatchedButton