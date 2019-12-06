import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import Grid, { GridMaxWidthGroup4 } from '.';

const outerGridProps = {
  columns: {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 6,
  },
};

const gridItemProps = {
  item: true,
  columns: {
    group0: 2,
    group1: 2,
    group2: 2,
    group3: 2,
    group4: 2,
    group5: 2,
  },
};

describe('Grid', () => {
  shouldMatchSnapshot(
    'should render Grid with columns',
    <Grid {...outerGridProps}>
      <Grid {...gridItemProps}>
        <p>Test</p>
      </Grid>
    </Grid>,
  );

  shouldMatchSnapshot(
    'should render GridMaxWidthGroup4 with columns',
    <GridMaxWidthGroup4 {...outerGridProps}>
      <Grid {...gridItemProps}>
        <p>Test</p>
      </Grid>
    </GridMaxWidthGroup4>,
  );
});
