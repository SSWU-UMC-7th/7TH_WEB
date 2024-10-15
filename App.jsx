import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MoviesPage from './components/MoviesPage';
import NowPlaying from './components/NowPlaying';
import Popular from './components/Popular';
import TopRated from './components/TopRated';
import Upcoming from './components/Upcoming';
import MovieDetail from './components/MovieDetail'; // MovieDetail 컴포넌트 추가
import { Layout, Main, SidebarContainer, Content } from './styles/LayoutStyle';


const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Layout>
        <Navbar />
        <Main>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <Content>
            <Routes>
              <Route path="/" element={<h1>홈페이지</h1>} />
              <Route path="/login" element={<h1>로그인 페이지</h1>} />
              <Route path="/signup" element={<h1>회원가입 페이지</h1>} />
              <Route path="/search" element={<h1>검색 페이지</h1>} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/now-playing" element={<NowPlaying />} />
              <Route path="/movies/popular" element={<Popular />} />
              <Route path="/movies/top-rated" element={<TopRated />} />
              <Route path="/movies/upcoming" element={<Upcoming />} />
              <Route path="/movies/:movieId" element={<MovieDetail />} /> {/* 상세 페이지 라우트 추가 */}
            </Routes>
          </Content>
        </Main>
      </Layout>
    </Router>
  );
};

export default App;
