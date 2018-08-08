import React from 'react';
import styled from 'styled-components';
import { arrayOf, element } from 'prop-types';
import { layoutGridWrapper, layoutGridItem } from '../../lib/layoutGrid';

const StyledMainContent = styled.main`
  ${layoutGridWrapper};
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">
    <GridItem>{children}</GridItem>
  </StyledMainContent>
);

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
