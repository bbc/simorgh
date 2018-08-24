import React from 'react';
import styled from 'styled-components';
import { arrayOf, element } from 'prop-types';
import { layoutGridWrapper, layoutGridItem } from '../../lib/layoutGrid';

export const StyledMainContent = styled.main`
  max-width: 1280px;
  margin: auto;
`;

const StyleGridWrapper = styled.div`
  ${layoutGridWrapper};
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

const MainContent = ({ children }) => (
  <StyledMainContent role="main">
    <StyleGridWrapper>
      <GridItem>{children}</GridItem>
    </StyleGridWrapper>
  </StyledMainContent>
);

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
