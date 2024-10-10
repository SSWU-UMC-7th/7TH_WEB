import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  gap: 10px;
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

const Navbar = () => {
  return (
    <Nav>
      <Logo to="/">YONGCHA</Logo>
      <ButtonContainer>
        <ButtonLink to="/login">로그인</ButtonLink>
        <ButtonLink to="/signup">회원가입</ButtonLink>
      </ButtonContainer>
    </Nav>
  );
};

export default Navbar;