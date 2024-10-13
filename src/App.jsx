import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './layout/root-layout.jsx'; // RootLayout 컴포넌트 import
import MoviesPage from './pages/movies.jsx'; // MoviesPage 컴포넌트 import
import HomePage from './pages/home.jsx'; // HomePage 컴포넌트 import
import LoginPage from './pages/login.jsx';
import SearchPage from './pages/search.jsx';
import SignupPage from './pages/signup.jsx';
import CategoryPage from './pages/category.jsx';
import NowPlayingPage from './pages/now-playing.jsx';
import TopRatedPage from './pages/top-rated.jsx';
import UpComingPage from './pages/up-coming.jsx';
import PopularPage from './pages/popular.jsx';

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/', // 루트 경로 (홈페이지)
    element: <RootLayout />, // 모든 페이지를 감싸는 레이아웃 컴포넌트
    children: [
      { path: '/', element: <HomePage /> }, // 홈 페이지
      { path: '/movies', element: <MoviesPage /> }, // 영화 목록 페이지
      { path: '/login', element: <LoginPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/category', element: <CategoryPage />},
      { path: '/now-playing',element: <NowPlayingPage/>},
      { path: '/popular', element:<PopularPage/>},
      { path: '/up-coming', element:<UpComingPage/>},
      { path: '/top-rated', element:<TopRatedPage/>}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />; // RouterProvider로 라우팅 설정을 적용
}

export default App;
