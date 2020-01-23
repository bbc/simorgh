import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '@bbc/psammead-grid';
import {
  fullWidthColumns,
  regularStoryColumns,
  leadingStoryColumns,
} from './gridColumns';

const TopRow = () => (
  <Grid item columns={fullWidthColumns}>
    <div style={{ backgroundColor: 'blue' }}>hi</div>
  </Grid>
);

const LeadingRow = () => (
  <>
    <Grid item columns={leadingStoryColumns}>
      <div style={{ backgroundColor: 'blue' }}>hi</div>
    </Grid>
    <Grid item columns={regularStoryColumns}>
      <div style={{ backgroundColor: 'green' }}>hi</div>
    </Grid>
  </>
);

const RegularRow = () => (
  <>
    <Grid item columns={regularStoryColumns}>
      <div style={{ backgroundColor: 'blue' }}>hi</div>
    </Grid>
    <Grid item columns={regularStoryColumns}>
      <div style={{ backgroundColor: 'red' }}>hi</div>
    </Grid>
    <Grid item columns={regularStoryColumns}>
      <div style={{ backgroundColor: 'green' }}>hi</div>
    </Grid>
    <Grid item columns={regularStoryColumns}>
      <div style={{ backgroundColor: 'purple' }}>hi</div>
    </Grid>
  </>
);

const getRow = RowType => {
  return (
    <Grid enableGelGutters columns={fullWidthColumns}>
      <RowType />
    </Grid>
  );
};

storiesOf('Containers|Front Page Section/Row Examples', module)
  .addParameters({
    chromatic: { disable: true },
  })
  .add('Top Row', () => getRow(TopRow))
  .add('Leading Row', () => getRow(LeadingRow))
  .add('Regular Row', () => getRow(RegularRow));
