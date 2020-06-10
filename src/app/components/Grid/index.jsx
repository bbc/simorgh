import React from 'react';
import styled from 'styled-components';
import { node } from 'prop-types';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

export const GelPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

/* The following components relate to Grid configuration and Grid styles used on the following page types:
 * STY,MAP,PGL,Front Page,IDX page
 */
const StyledCPSPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

export const CPSPageGrid = ({ children, ...props }) => (
  <StyledCPSPageGrid
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 8,
    }}
    enableGelGutters
    {...props}
  >
    {children}
  </StyledCPSPageGrid>
);

CPSPageGrid.propTypes = {
  children: node.isRequired,
};

export default Grid;
