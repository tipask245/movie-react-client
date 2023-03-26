import React from 'react'
import { IMovie } from '../types/movies'
import MovieCard from './Cards/MovieCard'

interface IMovieListProps {
  movies: IMovie[]
}

const MovieList: React.FC<IMovieListProps> = ({movies}: IMovieListProps) => {
  return (
    <ul className="movies_list">
        {
          movies.length !== 0 
            ? movies.map((movieItem: IMovie) => 
              <li className="movies_item" key={movieItem.id}>
                <MovieCard {...movieItem} />
              </li>
            )
            : <h3 className='movies_nf'>Фильмы не найдены</h3>
        }
        
      </ul>
  )
}

export default MovieList