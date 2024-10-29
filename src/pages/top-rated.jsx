import React from 'react';
import { TopRated } from '../movies/top-rated';
import useMovies from '../hooks/useMovies';
import { MovieCardList } from '../components/MovieCard';

const TopRatedPage = () => {
  const {movies,loading,error} = useMovies(TopRated);

  return (
  <MovieCardList movies={movies} loading={loading} error={error} />
  );
};

export default TopRatedPage;
