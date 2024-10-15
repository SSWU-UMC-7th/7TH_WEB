// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  color: white;
  padding: 10px 20px;
`;

const Logo = styled.h1`
  cursor: pointer;
  color: red;
`;

const Button = styled(Link)`
  padding: 10px 15px;
  color: white;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 4px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo onClick={() => window.location.href = '/'}>YONGCHA</Logo>
      <div>
        <Button to="/login">로그인</Button>
        <Button to="/signup">회원가입</Button>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
