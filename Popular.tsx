import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface PopularMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

// 영화 데이터를 가져오는 함수
const fetchPopularMovies = async ({ pageParam = 1 }: { pageParam?: number }): Promise<PopularMoviesResponse> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=71b31b966fde85da73283ea6b3ccbc60&language=ko-KR&page=${pageParam}`
  );
  return response.data;
};

const PopularMovies: React.FC = () => {
  // useInfiniteQuery 훅을 사용하여 페이지네이션 처리
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<PopularMoviesResponse, Error>({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => {
      // lastPage.page는 마지막 페이지 번호, total_pages는 전체 페이지 수
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <div>
      <div>
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.results.map((movie) => (
              <div key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  );
};

export default PopularMovies;

