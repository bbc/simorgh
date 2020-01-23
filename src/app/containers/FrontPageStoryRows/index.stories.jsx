import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '@bbc/psammead-grid';
import { topStoryColumns } from './storyColumns';
import { TopRow, LeadingRow, RegularRow } from '.';

// eslint-disable-next-line react/prop-types
const Promo = ({ color }) => <div style={{ backgroundColor: color }}>hi</div>;

const TopRowStory = () => <TopRow story={<Promo color="blue" />} />;

const LeadingRowStory = () => (
  <LeadingRow
    leadingStory={<Promo color="blue" />}
    regularStory={<Promo color="red" />}
  />
);

const RegularRowStory = () => (
  <RegularRow
    stories={[
      { story: <Promo color="blue" />, id: 0 },
      { story: <Promo color="red" />, id: 1 },
      { story: <Promo color="green" />, id: 2 },
      { story: <Promo color="purple" />, id: 3 },
    ]}
  />
);

const getRow = RowType => {
  return (
    <Grid enableGelGutters columns={topStoryColumns}>
      <RowType />
    </Grid>
  );
};

storiesOf('Containers|Front Page Story Row', module)
  .addParameters({
    chromatic: { disable: true },
  })
  .add('Top Row', () => getRow(TopRowStory))
  .add('Leading Row', () => getRow(LeadingRowStory))
  .add('Regular Row', () => getRow(RegularRowStory));
