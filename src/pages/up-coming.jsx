import React from 'react';
import { UpComing } from '../movies/up-coming';
import useMovies from '../hooks/useMovies';
import { MovieCardList } from '../components/MovieCard';

const UpComingPage = () => {
  const {movies,loading,error} = useMovies(UpComing);

  return (
  <MovieCardList movies={movies} loading={loading} error={error} />
  );
};

export default UpComingPage;

5