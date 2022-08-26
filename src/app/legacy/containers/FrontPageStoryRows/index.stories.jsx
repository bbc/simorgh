import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Grid from '#components/Grid';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
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

const selectDir = () => {
  const isRtl = boolean('Right to Left', false);
  return isRtl ? 'rtl' : 'ltr';
};

// eslint-disable-next-line react/prop-types
const Component = ({ RowType, displayImages = true }) => {
  return (
    <ServiceContextProvider service="news">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        id="c0000000000o"
        isAmp={false}
        pathname="/pathname"
        pageType={ARTICLE_PAGE}
        service="news"
      >
        <ToggleContextProvider
          toggles={{
            eventTracking: { enabled: false },
          }}
        >
          <Grid enableGelGutters columns={topStoryColumns}>
            <RowType dir={selectDir()} displayImages={displayImages} />
          </Grid>
        </ToggleContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Containers/Front Page Story Row',
  Component,
  decorators: [withKnobs],
  parameters: {
    chromatic: { disable: true },
  },
};

export const WithTopRow = () => <Component RowType={TopRowStory} />;
export const WithLeadingRow = () => <Component RowType={LeadingRowStory} />;
export const WithRegularRow = () => <Component RowType={RegularRowStory} />;
export const WithNoImageRow = () => (
  <Component RowType={RegularRowStory} displayImages={false} />
);
