import React from 'react';
import styled from 'styled-components';
import { arrayOf, element } from 'prop-types';
import { layoutGridWrapper, layoutGridMain } from '../../lib/layoutGrid';

const StyledMainContent = styled.main`
  ${layoutGridWrapper};
`;

const StyledDiv = styled.div`
  ${layoutGridMain};
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">
    <StyledDiv>{children}</StyledDiv>
  </StyledMainContent>
);

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
