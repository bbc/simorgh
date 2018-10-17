import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import { layoutGridWrapper, layoutGridItem } from '../../lib/layoutGrid';
import {
  group4ScreenWidthMin,
  group4ScreenWidthMax,
  group5ScreenWidthMin,
} from '../../lib/constants/styles';

const StyledGridWrapper = styled.div`
  ${layoutGridWrapper};
  margin: auto;
  @media (min-width: ${group4ScreenWidthMin}) and (max-width: ${group4ScreenWidthMax}) {
    max-width: 1008px;
  }
  @media (min-width: ${group5ScreenWidthMin}) {
    max-width: 1280px;
  }
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

const ContentWrapper = ({ children }) => (
  <StyledGridWrapper>
    <GridItem>{children}</GridItem>
  </StyledGridWrapper>
);

ContentWrapper.propTypes = {
  children: node.isRequired,
};

export default ContentWrapper;
