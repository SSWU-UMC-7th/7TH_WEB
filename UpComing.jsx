// import React from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// // Skeleton UI 스타일
// const Skeleton = styled.div`
//   width: 100%;
//   height: 300px;
//   background-color: #e0e0e0;
//   border-radius: 8px;
//   margin-bottom: 20px;
// `;

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

// const UpComing = () => {
//   // useQuery 훅을 객체 형태로 호출하여 영화 데이터를 불러옴
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['upcomingMovies'],
//     queryFn: async () => {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/upcoming?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=1`
//       );
//       return response.data.results;
//     },
//   });

//   if (isLoading) {
//     return (
//       <MovieGrid>
//         {/* 로딩 중일 때 Skeleton UI를 표시합니다. */}
//         {Array.from({ length: 9 }).map((_, index) => (
//           <Skeleton key={index} />
//         ))}
//       </MovieGrid>
//     );
//   }

//   if (error) {
//     return <div>영화 데이터를 불러오는 중 오류가 발생했습니다.</div>;
//   }

//   return (
//     <MovieGrid>
//       {data.map((movie) => (
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

// export default UpComing;

import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// 로딩 스피너 스타일
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

const fetchUpComingMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=${pageParam}`
  );
  return response.data;
};

const UpComing = () => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpComingMovies,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });

  // 스크롤이 하단에 도달했을 때 다음 페이지 로드
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>영화 데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <MovieGrid>
      {data.pages.map((page) =>
        page.results.map((movie) => (
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
        ))
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </MovieGrid>
  );
};

export default UpComing;
