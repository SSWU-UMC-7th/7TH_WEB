import {useEffect, useState} from "react";
import axios from "axios"; // yarn add axios 명령어 실행
import * as S from './movies.style.js'

const MoviesPage = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTNkYWIyMDkxMzI2Y2Y3NTkwNTAwYjQyODNkNjZkNyIsIm5iZiI6MTcyNjE0MTU3Ny42MDM2ODcsInN1YiI6IjY0MzVmY2Y2NjUxZmNmMDBkM2RhYzNmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFPsPRHPidq2OnJ3U-3wHJYhnGajDFqUsM8XJ_a_0bw`
                }
            })
            setMovies(movies.data.results);
        }
        getMovies()
    }, []);

    return (
      <S.CardList>
          {movies.map((movie) => (
              <S.Card key={movie.id}>
                  <S.Image 
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                      alt={movie.title}
                  />
                  <S.Title>{movie.title}</S.Title>
              </S.Card>
          ))}
      </S.CardList>
  );
};

export default MoviesPage;