import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,  // 템플릿 리터럴 수정
    },
    baseURL : import.meta.env.VITE_MOVIE_API_URL,  // API URL 환경
});

export {axiosInstance};