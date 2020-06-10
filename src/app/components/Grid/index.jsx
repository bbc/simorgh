import React from 'react';
import styled from 'styled-components';
import { node, bool } from 'prop-types';
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
const StyledCPSGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

export const CPSGrid = ({ children, enableMargins, ...props }) => {
  const noMargins = {
    group0: false,
    group1: false,
    group2: false,
    group3: false,
    group4: false,
    group5: false,
  };
  const gridMargins = {
    group0: true,
    group1: true,
    group2: true,
    group3: true,
    group4: false,
    group5: false,
  };

  const margins = enableMargins ? gridMargins : noMargins;

  return (
    <StyledCPSGrid
      columns={{
        group0: 6,
        group1: 6,
        group2: 6,
        group3: 6,
        group4: 8,
        group5: 8,
      }}
      enableGelGutters
      margins={margins}
      {...props}
    >
      {children}
    </StyledCPSGrid>
  );
};

CPSGrid.propTypes = {
  children: node.isRequired,
  enableMargins: bool,
};

CPSGrid.defaultProps = {
  enableMargins: false,
};

export default Grid;
