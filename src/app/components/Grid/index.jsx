import React from 'react';
import styled, { css } from 'styled-components';
import { node } from 'prop-types';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { gelGridMargin } from '#app/lib/layoutGrid';

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

const ConstrainedLarge = styled(Grid)`
  ${gelGridMargin};
`;

export const GridItemConstrainedLarge = ({ children, ...restProps }) => (
  <ConstrainedLarge
    item
    {...restProps}
    columns={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 6,
      group5: 12,
    }}
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 3,
      group5: 6,
    }}
    parentColumns={{
      group0: 8,
      group1: 8,
      group2: 8,
      group3: 8,
      group4: 4,
      group5: 3,
    }}
  >
    {children}
  </ConstrainedLarge>
);

GridItemConstrainedLarge.propTypes = {
  children: node.isRequired,
};

export const GelPageGrid = styled(Grid)`
  ${gelMaxWidths}
`;

export default Grid;
