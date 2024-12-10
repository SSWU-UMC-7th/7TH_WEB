import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// 스타일 정의
const Nav = styled.nav`
  background-color: #111;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  color: #f05454;
  font-size: 24px;
  text-decoration: none;
  &:hover {
    color: #ff6f61;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  color: white;
  background-color: #f05454;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ff6f61;
  }
`;

const ButtonLink = styled(Link)`
  color: white;
  background-color: #f05454;
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    background-color: #ff6f61;
  }
`;

const Nickname = styled.span`
  color: #ffeb3b;
  font-size: 16px;
  margin-right: 10px;
`;

// AuthContext에서 타입을 가져옴
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn, nickname, setNickname } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !nickname) {
      fetchUserInfo(accessToken);
    }
  }, [isLoggedIn, nickname]);

  // 사용자 정보 가져오기
  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3000/user/me', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const email = data.email;
        setNickname(email.split('@')[0]);
      } else {
        throw new Error('Failed to fetch user info.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setNickname('');
    navigate('/login');
  };

  return (
    <Nav>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        {isLoggedIn ? (
          <>
            <Nickname>{nickname}님, 반갑습니다.</Nickname>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <ButtonLink to="/login">로그인</ButtonLink>
            <ButtonLink to="/signup">회원가입</ButtonLink>
          </>
        )}
      </ButtonContainer>
    </Nav>
  );
};

export default Navbar;
