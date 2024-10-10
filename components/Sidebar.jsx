import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilm} from 'react-icons/fa'; 

const SidebarContainer = styled.div`
  width: 103px;
  background-color: #1a1a1a;
  padding: 20px;
  height: 100vh;
  flex-shrink: 0;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: #fff;
  padding: 10px 0;
  text-decoration: none;
  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 20px; /* 아이콘과 텍스트 사이의 간격 */
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/search"><FaSearch />찾기</SidebarLink>
      <SidebarLink to="/movieCategory"><FaFilm />영화</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;