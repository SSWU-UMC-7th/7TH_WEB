// import React from 'react';
// import styled from 'styled-components';
// import { MOVIES } from '../mocks/movies'; // 영화 데이터를 import

// const MovieGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(9, 1fr);
//   gap: 20px;
// `;

// const MovieCard = styled.div`
//   text-align: left; 
// `;

// const MoviePoster = styled.img`
//   width: 100%;
//   border-radius: 8px;
//   transition: transform 0.2s ease-in-out;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const MovieTitle = styled.h3`
//   font-size: 10px;
//   color: white; // 제목 색깔을 흰색으로 설정
//   margin: 5px 0 5px; // 상단 여백, 하단 여백
// `;

// const ReleaseDate = styled.p`
//   font-size: 8px;
//   color: gray; // 개봉일 색깔을 회색으로 설정
//   margin: 0; // 여백을 없앰
// `;

// const MovieList = () => {
//   const twoRowsOfMovies = MOVIES.results.slice(0, 20);

//   return (
//     <MovieGrid>
//       {twoRowsOfMovies.map((movie) => (
//         <MovieCard key={movie.id}>
//           <MoviePoster
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//           />
//           <MovieTitle>{movie.title}</MovieTitle>
//           <ReleaseDate>{movie.release_date}</ReleaseDate>
//         </MovieCard>
//       ))}
//     </MovieGrid>
//   );
// };

// export default MovieList;


// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios'; // Axios import

// const MovieGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(9, 1fr);
//   gap: 20px;
// `;

// const MovieCard = styled.div`
//   text-align: left;
// `;

// const MoviePoster = styled.img`
//   width: 100%;
//   border-radius: 8px;
//   transition: transform 0.2s ease-in-out;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const MovieTitle = styled.h3`
//   font-size: 10px;
//   color: white; // 제목 색깔을 흰색으로 설정
//   margin: 5px 0 5px; // 상단 여백, 하단 여백
// `;

// const ReleaseDate = styled.p`
//   font-size: 8px;
//   color: gray; // 개봉일 색깔을 회색으로 설정
//   margin: 0; // 여백을 없앰
// `;

// const MovieList = () => {
//   const [movies, setMovies] = useState([]); // 상태 초기화
//   const [loading, setLoading] = useState(true); // 로딩 상태

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/now_playing?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
//         ); // 실제 TMDB API URL
//         setMovies(response.data.results); // 영화 데이터를 상태에 저장
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setLoading(false); // 로딩 상태를 false로 설정
//       }
//     };

//     fetchMovies(); // 영화 데이터 가져오기 호출
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // 로딩 중일 때 보여줄 내용
//   }

//   return (
//     <MovieGrid>
//       {movies.map((movie) => (
//         <MovieCard key={movie.id}>
//           <MoviePoster
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//           />
//           <MovieTitle>{movie.title}</MovieTitle>
//           <ReleaseDate>{movie.release_date}</ReleaseDate>
//         </MovieCard>
//       ))}
//     </MovieGrid>
//   );
// };

// export default MovieList;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Link 추가
import useCustomFetch from '../hooks/useCustomFetch';

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
  // useCustomFetch 훅을 통해 영화 데이터를 받아옴
  const { data: movies, isLoading, isError } = useCustomFetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
  );

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 내용
  }

  if (isError) {
    return <div>Error fetching movies...</div>; // 에러 발생 시 보여줄 내용
  }
  return (
    <MovieGrid>
      {movies.map((movie) => (
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
  );
};

export default MovieList;