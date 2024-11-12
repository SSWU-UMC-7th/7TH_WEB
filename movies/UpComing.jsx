// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Link 추가

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

// const UpComing = () => {
//   const [movies, setMovies] = useState([]); // 상태 초기화
//   const [loading, setLoading] = useState(true); // 로딩 상태

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/upcoming?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1` // 영화 데이터 요청
//         );
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
//           <Link to={`/movies/${movie.id}`}> {/* 영화 ID에 따라 링크 생성 */}
//             <MoviePoster
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//             />
//             <MovieTitle>{movie.title}</MovieTitle>
//             <ReleaseDate>{movie.release_date}</ReleaseDate>
//           </Link>
//         </MovieCard>
//       ))}
//     </MovieGrid>
//   );
// };

// export default UpComing;

import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// Skeleton UI 스타일
const Skeleton = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
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

const UpComing = () => {
  // useQuery 훅을 객체 형태로 호출하여 영화 데이터를 불러옴
  const { data, error, isLoading } = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
      );
      return response.data.results;
    },
  });

  if (isLoading) {
    return (
      <MovieGrid>
        {/* 로딩 중일 때 Skeleton UI를 표시합니다. */}
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </MovieGrid>
    );
  }

  if (error) {
    return <div>영화 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <MovieGrid>
      {data.map((movie) => (
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

export default UpComing;
