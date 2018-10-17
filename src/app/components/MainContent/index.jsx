import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';

export const StyledMainContent = styled.main`
  display: grid;
  grid-template-columns: [leftCol] 1fr [mainCol] 1280px [rightCol] 1fr;
`;
const MainContent = ({ children }) => (
  <StyledMainContent role="main">{children}</StyledMainContent>
);

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
