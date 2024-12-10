import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import styled from "styled-components";
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 15px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }

  button {
    width: 80px;
    background-color: #F82E62;
    color: white;
    cursor: pointer;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const MovieCard = styled.div`
  width: 150px;
  text-align: center;

  img {
    width: 100%;
    border-radius: 5px;
  }

  h4 {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const SkeletonCard = styled.div`
  width: 150px;
  height: 250px;
  background-color: #ccc;
  border-radius: 5px;
  animation: shimmer 1.5s infinite linear;
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`;

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

// TMDB API 응답 타입 정의
interface MovieResponse {
  results: Movie[];
}

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>(''); // 검색어 상태
  const [movies, setMovies] = useState<Movie[]>([]); // 영화 데이터 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [hasSearched, setHasSearched] = useState<boolean>(false); // 검색 여부 상태
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mq = searchParams.get('mq');

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    setHasSearched(true); // 검색 실행됨을 표시
    setIsLoading(true); // 로딩 상태 설정
    navigate(`/search?mq=${searchValue}`);
    fetchMovies(searchValue); // 영화 데이터 검색
  };

  const handleSearchMovieWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  };

  // 영화 데이터를 여러 개 가져오는 함수
  const fetchMovies = async (title: string) => {
    try {
      const response = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/search/movie?api_key=71b31b966fde85da73283ea6b3ccbc60&query=${title}&language=ko-KR`
      );
      setMovies(response.data.results); // 검색된 영화 배열을 상태에 저장
    } catch (error) {
      console.error("영화 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <>
      <SearchContainer>
        <input 
          placeholder="영화 제목을 입력해주세요..." 
          value={searchValue} 
          onChange={onChangeSearchValue}
          onKeyDown={handleSearchMovieWithKeyboard}
        />
        <button onClick={handleSearchMovie}>검색</button>
      </SearchContainer>
      
      {isLoading ? (
        // 로딩 중일 때 스켈레톤 UI 표시
        <MoviesContainer>
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </MoviesContainer>
      ) : hasSearched && movies.length === 0 ? (
        // 검색 후 결과가 없을 때 메시지 표시
        <div style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
          <h1>해당하는 영화가 없습니다.</h1>
        </div>
      ) : (
        // 영화 데이터를 로드했을 때 결과 표시
        <MoviesContainer>
          {movies.map(movie => (
            <MovieCard key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h4>{movie.title}</h4>
            </MovieCard>
          ))}
        </MoviesContainer>
      )}
    </>
  );
};

export default Search;
