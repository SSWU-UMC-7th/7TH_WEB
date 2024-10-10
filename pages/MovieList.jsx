import React from 'react';
import styled from 'styled-components';
import { MOVIES } from '../mocks/movies'; // 영화 데이터를 import

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 20px;
`;

const MovieCard = styled.div`
  text-align: left; 
`;

const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const MovieTitle = styled.h3`
  font-size: 10px;
  color: white; // 제목 색깔을 흰색으로 설정
  margin: 5px 0 5px; // 상단 여백, 하단 여백
`;

const ReleaseDate = styled.p`
  font-size: 8px;
  color: gray; // 개봉일 색깔을 회색으로 설정
  margin: 0; // 여백을 없앰
`;

const MovieList = () => {
  const twoRowsOfMovies = MOVIES.results.slice(0, 20);

  return (
    <MovieGrid>
      {twoRowsOfMovies.map((movie) => (
        <MovieCard key={movie.id}>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieTitle>{movie.title}</MovieTitle>
          <ReleaseDate>{movie.release_date}</ReleaseDate>
        </MovieCard>
      ))}
    </MovieGrid>
  );
};

export default MovieList;