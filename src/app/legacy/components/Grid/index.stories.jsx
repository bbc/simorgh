import React from 'react';
import Grid, { CPSPageGrid as CPSPageGridComponent } from '.';
import readme from './README.md';

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

export default {
  Component: Grid,
  title: 'Components/Grid',
  parameters: {
    docs: { readme },
  },
};

export const GridAsMain = () => (
  <Grid as="main" role="main" {...outerGridProps}>
    <Grid {...gridItemProps}>
      <p>Item with Main element as the parent grid</p>
    </Grid>
  </Grid>
);

export const CPSPageGrid = () => (
  <CPSPageGridComponent>
    <Grid {...gridItemProps}>
      <p>CPS page grid</p>
    </Grid>
  </CPSPageGridComponent>
);
