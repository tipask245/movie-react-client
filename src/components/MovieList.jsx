import React from 'react'
import MovieCard from './Cards/MovieCard'

const MovieList = ({movie}) => {
  return (
    <ul className="movies_list">
        {
          movie.length !== 0 
            ? movie.map((movieItem) => 
              <li className="movies_item" key={movieItem.id}>
                <MovieCard movie={movieItem} />
              </li>
            )
            : <h3 className='movies_nf'>Фильмы не найдены</h3>
        }
        
      </ul>
  )
}

export default MovieList