import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styled from 'styled-components';

const MoviePoster = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

interface MovieDetails {
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

interface Credit {
  id: number;
  name: string;
  profile_path: string;
  job?: string;
}

interface Credits {
  crew: Credit[];
  cast: Credit[];
}

const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR`
  );
  return response.data;
};

const fetchCredits = async (movieId: string): Promise<Credits> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR`
  );
  return response.data;
};

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 영화 정보 가져오기
  const { data: movie, isLoading: movieLoading, isError: movieError } = useQuery<MovieDetails>({
    queryKey: ['movieDetails', movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 요청
  });

  // 감독 및 출연진 정보 가져오기
  const { data: credits, isLoading: creditsLoading, isError: creditsError } = useQuery<Credits>({
    queryKey: ['movieCredits', movieId],
    queryFn: () => fetchCredits(movieId!),
    enabled: !!movieId, // movieId가 존재할 때만 요청
  });

  // 로딩 처리
  if (movieLoading || creditsLoading) {
    return <div>Loading...</div>;
  }

  // 오류 처리
  if (movieError || creditsError) {
    return <div>Error fetching movie details...</div>;
  }

  return (
    <div>
      <MoviePoster
        src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
        alt={movie?.title}
      />

      <h1>{movie?.title}</h1>
      <p>평균 평점: {movie?.vote_average}</p>
      <p>개봉일: {movie?.release_date}</p>
      
      <h1>감독/출연</h1>
      
      {/* 감독 정보 */}
      <div>
        {credits?.crew
          .filter((member) => member.job === 'Director')
          .map((director) => (
            <div key={director.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                alt={director.name}
                style={{ width: '100px', height: '150px', borderRadius: '50px' }}
              />
              <p>{director.name}</p>
            </div>
          ))}
      </div>

      {/* 출연진 정보 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {credits?.cast.map((actor) => (
          <div key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              style={{ width: '100px', height: '150px', borderRadius: '50px' }}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
