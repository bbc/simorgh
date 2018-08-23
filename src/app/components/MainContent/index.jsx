import React from 'react';
import styled from 'styled-components';
import { arrayOf, element } from 'prop-types';
import {
  layoutGridWrapper,
  layoutGridItem,
  twelveEightyGridWrapper,
} from '../../lib/layoutGrid';

const StyledMainContent = styled.main`
  ${layoutGridWrapper};
`;

const TwelveEightyGridWrapper = styled.div`
  ${twelveEightyGridWrapper};
`;

const GridItem = styled.div`
  ${layoutGridItem};
`;

const MainContent = ({ children }) => (
  <TwelveEightyGridWrapper>
    <StyledMainContent role="main">
      <GridItem>{children}</GridItem>
    </StyledMainContent>
  </TwelveEightyGridWrapper>
);

MainContent.propTypes = {
  children: arrayOf(element).isRequired,
};

export default MainContent;
