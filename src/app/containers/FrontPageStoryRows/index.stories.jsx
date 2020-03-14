import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '@bbc/psammead-grid';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { topStoryColumns } from './storyColumns';
import { TopRow, LeadingRow, RegularRow } from '.';
import getNumberPromoFixtures from './testHelpers';

// eslint-disable-next-line react/prop-types
const TopRowStory = ({ dir, displayImages }) => (
  <TopRow
    stories={getNumberPromoFixtures(dir, 1)}
    dir={dir}
    displayImages={displayImages}
  />
);

// eslint-disable-next-line react/prop-types
const LeadingRowStory = ({ dir, displayImages }) => (
  <LeadingRow
    stories={getNumberPromoFixtures(dir, 2)}
    dir={dir}
    displayImages={displayImages}
  />
);

// eslint-disable-next-line react/prop-types
const RegularRowStory = ({ dir, displayImages }) => (
  <RegularRow
    stories={getNumberPromoFixtures(dir, 4)}
    displayImages={displayImages}
    dir={dir}
  />
);

const getRow = (RowType, dir = 'ltr', displayImages = true) => {
  return (
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pathname="/pathname"
        pageType="article"
        service="news"
      >
        <Grid enableGelGutters columns={topStoryColumns} dir={dir}>
          <RowType dir={dir} displayImages={displayImages} />
        </Grid>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

storiesOf('Containers|Front Page Story Row', module)
  .addParameters({
    chromatic: { disable: true },
  })
  .addDecorator(withKnobs)
  .add('Top Row', () => getRow(TopRowStory))
  .add('Leading Row', () => getRow(LeadingRowStory))
  .add('Regular Row', () => getRow(RegularRowStory))
  .add('NoImage Row', () => getRow(RegularRowStory, 'ltr', false))
  .add('Top Row RTL', () => getRow(TopRowStory, 'rtl'))
  .add('Leading Row RTL', () => getRow(LeadingRowStory, 'rtl'))
  .add('Regular Row RTL', () => getRow(RegularRowStory, 'rtl'))
  .add('NoImage Row RTL', () => getRow(RegularRowStory, 'rtl', false));
