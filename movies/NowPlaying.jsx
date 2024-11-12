// import React from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query'; // useQuery 추가

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
//   color: white;
//   margin: 5px 0 5px;
// `;

// const ReleaseDate = styled.p`
//   font-size: 8px;
//   color: gray;
//   margin: 0;
// `;

// // 영화 데이터를 가져오는 함수
// const fetchNowPlayingMovies = async () => {
//   const response = await axios.get(
//     `https://api.themoviedb.org/3/movie/now_playing?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
//   );
//   return response.data.results;
// };

// const NowPlaying = () => {
//   const { data: movies, isLoading, isError, error } = useQuery('nowPlayingMovies', fetchNowPlayingMovies);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <MovieGrid>
//       {movies.map((movie) => (
//         <MovieCard key={movie.id}>
//           <Link to={`/movies/${movie.id}`}>
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

// export default NowPlaying;

// NowPlaying.jsx
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

const NowPlaying = () => {
  // useQuery 훅을 객체 형태로 호출하여 영화 데이터를 불러옴
  const { data, error, isLoading } = useQuery({
    queryKey: ['nowPlayingMovies'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
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

export default NowPlaying;



