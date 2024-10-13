import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components for Navbar
const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* 세로 가운데 정렬 */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px; /* 버튼 간의 간격 */
  margin-left: auto; /* 버튼을 오른쪽 끝으로 밀기 */
`;

const StyledButton = styled.button`
  background-color: #D91656;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #A31345;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link to="/" style={{ color: '#D91656', textDecoration: 'none', fontWeight: 'bold'}}>YONGCHA</Link>
      <ButtonGroup>
        <StyledButton>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
        </StyledButton>
        <StyledButton>
          <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
        </StyledButton>
      </ButtonGroup>
    </NavbarContainer>
  );
};

export default Navbar;
