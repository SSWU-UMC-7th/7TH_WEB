import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// 스타일 정의
const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #ff4081;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

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
  color: white;
  margin: 5px 0 5px;
`;

const ReleaseDate = styled.p`
  font-size: 8px;
  color: gray;
  margin: 0;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ff4081;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff1c6b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  font-size: 16px;
  color: white;
`;

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface NowPlayingResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

// 영화 데이터를 가져오는 함수
const fetchNowPlayingMovies = async (page: number): Promise<NowPlayingResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=${page}`
  );
  return response.data;
};

const NowPlaying: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  // useQuery 훅에서 페이지를 반영하도록 설정
  const { data, error, isLoading } = useQuery<NowPlayingResponse, Error>({
    queryKey: ['nowPlayingMovies', page], // 페이지를 쿼리 키에 포함시킴
    queryFn: () => fetchNowPlayingMovies(page),
    keepPreviousData: true, // 페이지 전환 시 이전 데이터를 유지
  });

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error instanceof Error) {
    return <div>영화 데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <>
      <MovieGrid>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MoviePoster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
              <ReleaseDate>{movie.release_date}</ReleaseDate>
            </Link>
          </MovieCard>
        ))}
      </MovieGrid>

      <PaginationControls>
        <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
          이전
        </PaginationButton>
        <PageNumber>페이지 {page}</PageNumber>
        <PaginationButton onClick={handleNextPage} disabled={page === data?.total_pages}>
          다음
        </PaginationButton>
      </PaginationControls>
    </>
  );
};

export default NowPlaying;

