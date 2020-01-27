import React from 'react';
import { storiesOf } from '@storybook/react';
import Grid from '@bbc/psammead-grid';
import { take } from 'ramda';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { topStoryColumns } from './storyColumns';
import { TopRow, LeadingRow, RegularRow } from '.';
import getPromoFixtures from './testHelpers';

const standardPromos = (dir, number) => take(number, getPromoFixtures(dir));

// eslint-disable-next-line react/prop-types
const TopRowStory = ({ dir }) => (
  <TopRow stories={standardPromos(dir, 1)} dir={dir} />
);

// eslint-disable-next-line react/prop-types
const LeadingRowStory = ({ dir }) => (
  <LeadingRow stories={standardPromos(dir, 2)} dir={dir} />
);

// eslint-disable-next-line react/prop-types
const RegularRowStory = ({ dir }) => (
  <RegularRow stories={standardPromos(dir, 4)} displayImages dir={dir} />
);

const getRow = (RowType, dir = 'ltr') => {
  return (
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        pathname="/pathname"
        pageType="article"
        service="news"
      >
        <Grid enableGelGutters columns={topStoryColumns} dir={dir}>
          <RowType dir={dir} />
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
  .addDecorator(withServicesKnob())
  .add('Top Row', () => getRow(TopRowStory))
  .add('Leading Row', () => getRow(LeadingRowStory))
  .add('Regular Row', () => getRow(RegularRowStory))
  .add('Top Row RTL', () => getRow(TopRowStory, 'rtl'))
  .add('Leading Row RTL', () => getRow(LeadingRowStory, 'rtl'))
  .add('Regular Row RTL', () => getRow(RegularRowStory, 'rtl'));
