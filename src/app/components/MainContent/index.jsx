import React from 'react';
import styled from 'styled-components';
import { node, string } from 'prop-types';
import { layoutGridWrapper, layoutGridItem } from '../../lib/layoutGrid';
import {
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from '../../lib/constants/styles';

export const StyledMainContent = styled.main``;

export const StyleGridWrapper = styled.div`
  ${layoutGridWrapper};
`;

export const GridItem = styled.div`
  ${layoutGridItem};
  margin: auto;
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    max-width: 1008px;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    max-width: 1280px;
  }
`;

export const ConstrainedGridItem = ({ fullWidthBackgroundColor, children }) => (
  <StyleGridWrapper style={{ backgroundColor: fullWidthBackgroundColor }}>
    <GridItem>{children}</GridItem>
  </StyleGridWrapper>
);

ConstrainedGridItem.propTypes = {
  children: node.isRequired,
  fullWidthBackgroundColor: string.isRequired,
};

export const MainContent = ({ children }) => (
  <StyledMainContent role="main">{children}</StyledMainContent>
);

MainContent.propTypes = {
  children: node.isRequired,
};

export default MainContent;
