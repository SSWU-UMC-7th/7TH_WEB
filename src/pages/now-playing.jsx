import React from 'react';
import { NowPlaying } from '../movies/now-playing';
import useMovies from '../hooks/useMovies';
import { MovieCardList } from '../components/MovieCard';

const NowPlayingPage = () => {
  const {movies,loading,error} = useMovies(NowPlaying);

  return (
  <MovieCardList movies={movies} loading={loading} error={error} />
  // useMovies 훅에서 받아온 영화 데이터 목록을 MovieCardList 컴포넌트로 전달
  // movies는 배열 형태로 영화 데이터를 담고 있으며
  // MovieCardList는 이 데이터를 받아서 각각의 영화를 카드 형식으로 화면에 렌더링할 것 
  );
};

export default NowPlayingPage;
