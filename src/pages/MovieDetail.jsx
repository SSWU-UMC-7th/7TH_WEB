import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const MoviePoster = styled.img`
  width: 100%;
  height:300px;
  border-radius: 8px;
`;


const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null); // 감독 및 출연자 정보 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR`
        );
        setMovie(response.data);

        const creditsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR`
        );
        setCredits(creditsResponse.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details...</div>;
  }

  return (
    <div>

      <MoviePoster 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />

      <h1>{movie.title}</h1>
      <p>평균 평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>
      <h1>감독/출연</h1>
      <div>
        {credits.crew
          .filter((member) => member.job === 'Director') // 감독만 필터링
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {credits.cast.map((actor) => (
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
