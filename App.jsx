import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieList from './pages/MovieList';
import Login from './pages/Login';
import Search from './pages/Search';
import Signup from './pages/Signup';
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
          </Routes>
        </Content>
      </AppContainer>
    </Router>
  );
}

export default App;