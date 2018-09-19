import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { layoutGridWrapper, layoutGridItem } from '../../lib/layoutGrid';
import {
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from '../../lib/constants/styles';

export const StyledMainContent = styled.main`
  margin: auto;
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    max-width: 1008px;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    max-width: 1280px;
  }
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
  children: node.isRequired,
};

export default MainContent;
