/* styles/LayoutStyle.js */
import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Main = styled.div`
  display: flex;
  flex: 1;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #333;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
  margin: 5px auto;
`;

