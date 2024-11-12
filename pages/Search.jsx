// import React, {useState} from 'react';
// import styled from "styled-components";
// import { useSearchParams , useNavigate} from 'react-router-dom';

// const SearchContainer = styled.div`
//   display: flex;
//   justify-content: center;

//   input{
//     flex :1;
//     padding :15px;
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
//     border : 1px solid rgb(220,220,220);
//   }

//   button{
//     width: 80px;
//     background-color: #F82E62;
//     color : white;
//     cursor : pointer;
//     border: none;
//     border-top-right-radius: 5px;
//     border-bottom-right-radius: 5px;
//   }
// `

// const Search = () => {
//   const [searchValue, setSearchValue] = useState('');

//   const navigate = useNavigate();

//   const onChangeSearchValue = (event) => {
//     setSearchValue(event.target.value)
//   }

//   const[searchParams, setSearchParams] = useSearchParams({
//     mq: ''
//   })

//   const mq= searchParams.get('mq');

//   const handleSearchMovie = () => {
//     if (mq === searchValue) return;
//     navigate(`/search?mq=${searchValue}`)
//   }

//   const handleSearchMovieWithKeyboard = (e) => {
//     if (e.key === 'Enter') { 
//       handleSearchMovie();
//     }
//   }

//   return (
//     <SearchContainer>
//       <input placeholder="영화 제목을 입력해주세요..."value={searchValue} onChange={onChangeSearchValue}
//         onKeyDown={handleSearchMovieWithKeyboard}
//       />
//       <button onClick={handleSearchMovie}>검색</button>
//     </SearchContainer>
//   );
// };

// export default Search;

// import React, { useState, useEffect } from 'react';
// import styled from "styled-components";
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const SearchContainer = styled.div`
//   display: flex;
//   justify-content: center;

//   input {
//     flex: 1;
//     padding: 15px;
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
//     border: 1px solid rgb(220, 220, 220);
//   }

//   button {
//     width: 80px;
//     background-color: #F82E62;
//     color: white;
//     cursor: pointer;
//     border: none;
//     border-top-right-radius: 5px;
//     border-bottom-right-radius: 5px;
//   }

//   img {
//     margin-top: 20px;
//     max-width: 100%;
//     height: auto;
//   }
// `;

// const Search = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [movieData, setMovieData] = useState(null); // 영화 데이터를 저장할 상태
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const mq = searchParams.get('mq');

//   const onChangeSearchValue = (event) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearchMovie = () => {
//     if (mq === searchValue) return;
//     navigate(`/search?mq=${searchValue}`);
//     fetchMovieData(searchValue); // 영화 데이터 검색
//   };

//   const handleSearchMovieWithKeyboard = (e) => {
//     if (e.key === 'Enter') {
//       handleSearchMovie();
//     }
//   };

//   // 영화 데이터를 가져오는 함수
//   const fetchMovieData = async (title) => {
//     try {
//       const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=71b31b966fde85da73283ea6b3ccbc60&query=${title}`);
//       if (response.data.results.length > 0) {
//         setMovieData(response.data.results[0]); // 검색된 첫 번째 영화 데이터 저장
//       } else {
//         setMovieData(null); // 영화가 없으면 null로 설정
//       }
//     } catch (error) {
//       console.error("영화 데이터를 가져오는 중 오류 발생:", error);
//     }
//   };

//   return (
//     <SearchContainer>
//       <input 
//         placeholder="영화 제목을 입력해주세요..." 
//         value={searchValue} 
//         onChange={onChangeSearchValue}
//         onKeyDown={handleSearchMovieWithKeyboard}
//       />
//       <button onClick={handleSearchMovie}>검색</button>
//       {movieData && (
//         <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
//       )}
//     </SearchContainer>
//   );
// };

// export default Search;

import React, { useState } from 'react';
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

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]); // 여러 개의 영화 데이터를 저장할 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
  const [hasSearched, setHasSearched] = useState(false); // 검색이 실행되었는지 여부를 저장할 상태
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mq = searchParams.get('mq');

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchMovie = () => {
    if (mq === searchValue) return;
    setHasSearched(true); // 검색이 실행됨을 표시
    setIsLoading(true); // 로딩 시작
    navigate(`/search?mq=${searchValue}`);
    fetchMovies(searchValue); // 영화 데이터 검색
  };

  const handleSearchMovieWithKeyboard = (e) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  };

  // 영화 데이터를 여러 개 가져오는 함수
  const fetchMovies = async (title) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=71b31b966fde85da73283ea6b3ccbc60&query=${title}&language=ko-KR`);
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
