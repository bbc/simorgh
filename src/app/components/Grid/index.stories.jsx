import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('Components|Grid', module)
  .add('default', () => {
    return (
      <Grid {...outerGridProps}>
        <Grid {...gridItemProps}>
          <p>Test</p>
        </Grid>
      </Grid>
    );
  })
  .add('Grid as Main', () => {
    return (
      <Grid as="main" role="main" {...outerGridProps}>
        <Grid {...gridItemProps}>
          <p>Test</p>
        </Grid>
      </Grid>
    );
  })
  .add('GridMaxWidthGroup4', () => {
    return (
      <GridMaxWidthGroup4 {...outerGridProps}>
        <Grid {...gridItemProps}>
          <p>Test</p>
        </Grid>
      </GridMaxWidthGroup4>
    );
  })
  .add('GridMaxWidthGroup4 forwardedAs Main', () => {
    return (
      <GridMaxWidthGroup4 forwardedAs="main" role="main" {...outerGridProps}>
        <Grid {...gridItemProps}>
          <p>Test</p>
        </Grid>
      </GridMaxWidthGroup4>
    );
  });
