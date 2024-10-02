import React from "react";
import { MOVIES } from "./mocks/movies"; 
import './App.css'; 

const MovieList = () => {
  const movies = MOVIES.results.slice(0, 10); 

  return (
    <div className="movie-container"> {/* className을 movie-list에서 movie-container로 변경 */}
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <img
            className="movie-image"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="overlay">
            <p className="movie-title">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
