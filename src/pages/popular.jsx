import React from 'react';
import { Popular } from '../movies/popular';
import useMovies from '../hooks/useMovies';
import { MovieCardList } from '../components/MovieCard';

const PopularPage = () => {
  const {movies,loading,error} = useMovies(Popular);

  return (
  <MovieCardList movies={movies} loading={loading} error={error} />
  );
};

export default PopularPage;
