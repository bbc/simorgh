import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';

export const StyledMainContent = styled.main`
  display: grid;
  grid-template-columns: [start] 1fr [main-start] repeat(10, minmax(0, 128px)) [main-end] 1fr [end];
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">{children}</StyledMainContent>
);

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
