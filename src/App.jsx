import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieList from './pages/MovieList';
import Login from './pages/Login';
import Search from './pages/Search';
import Signup from './pages/Signup';
import MovieCategory from './pages/MovieCategory';
import NowPlaying from './movies/NowPlaying';
import Popular from './movies/Popular';
import TopRated from './movies/TopRated';
import UpComing from './movies/UpComing';
import MovieDetail from './pages/MovieDetail';

import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  padding : 10px;
  flex-grow: 1;
  background-color: #121212;
  min-height: 100vh;
  color : white;
`;



function App() {
  return (
    <Router>
      <Navbar />
      <AppContainer>
        <Sidebar />
        <Content>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movieCategory" element={<MovieCategory />} />
            <Route path="/movies/now-playing" element={<NowPlaying />} />
            <Route path="/movies/popular" element={<Popular />}/>
            <Route path="/movies/top-rated" element={<TopRated />}/>
            <Route path="/movies/up-coming" element={<UpComing />}/>
            <Route path="/movies/:movieId" element={<MovieDetail />} />
          </Routes>
        </Content>
      </AppContainer>
    </Router>
  );
}

export default App;