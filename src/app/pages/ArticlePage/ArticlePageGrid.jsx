import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';

import Grid, { GelPageGrid } from '#components/Grid';

const gridColumns = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 12,
  group5: 12,
};

const gridMargins = {
  group0: false,
  group1: false,
  group2: false,
  group3: false,
  group4: true,
  group5: true,
};

const gridOffset = {
  group0: 0,
  group1: 0,
  group2: 0,
  group3: 0,
  group4: 0,
  group5: 0,
};

const gridColsMain = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 8,
  group5: 8,
};

const gridColsSecondary = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 4,
  group5: 4,
};

const StyledGelPageGrid = styled(GelPageGrid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const ArticlePageGrid = props => (
  <StyledGelPageGrid
    enableGelGutters
    columns={gridColumns}
    margins={gridMargins}
    {...props}
  />
);

export default ArticlePageGrid;

const GridPrimaryColumn = styled(Grid)`
  @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    width: 100%;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 100%;
  }
  padding-bottom: ${GEL_SPACING_QUAD};
`;

export const Primary = props => (
  <GridPrimaryColumn
    item
    columns={gridColsMain}
    startOffset={gridOffset}
    parentColumns={gridColumns}
    {...props}
  />
);

const GridSecondaryColumn = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_QUAD};
  }
`;

export const Secondary = props => (
  <GridSecondaryColumn
    item
    columns={gridColsSecondary}
    startOffset={gridOffset}
    parentColumns={gridColumns}
    {...props}
  />
);
