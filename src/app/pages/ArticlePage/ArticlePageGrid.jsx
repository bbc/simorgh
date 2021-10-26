import React from 'react';
import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';

import Grid, { GelPageGrid } from '#components/Grid';

const gridConfig = (...values) =>
  Object.fromEntries(values.map((value, index) => [`group${index}`, value]));

const gridColumns = gridConfig(8, 8, 8, 8, 12, 12);
const gridMargins = gridConfig(false, false, false, false, true, true);
const gridOffset = gridConfig(0, 0, 0, 0, 0, 0);

const gridColumnsPrimary = gridConfig(8, 8, 8, 8, 8, 8);
export const gridColumnsSecondary = gridConfig(8, 8, 8, 8, 4, 4);

const StyledGelPageGrid = styled(GelPageGrid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

const ArticlePageGrid = props => (
  <StyledGelPageGrid columns={gridColumns} margins={gridMargins} {...props} />
);

export default ArticlePageGrid;

const GridPrimaryColumn = styled(Grid)`
  padding-bottom: ${GEL_SPACING_QUAD};
`;

export const Primary = props => (
  <GridPrimaryColumn
    item
    columns={gridColumnsPrimary}
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
    columns={gridColumnsSecondary}
    startOffset={gridOffset}
    parentColumns={gridColumns}
    {...props}
  />
);
