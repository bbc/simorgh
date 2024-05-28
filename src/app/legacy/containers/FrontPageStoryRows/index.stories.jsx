import React from 'react';
import Grid from '#components/Grid';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { topStoryColumns } from './storyColumns';
import { TopRow, LeadingRow, RegularRow } from '.';
import getNumberPromoFixtures from './testHelpers';

const TopRowStory = ({ dir, displayImages }) => (
  <TopRow
    stories={getNumberPromoFixtures(dir, 1)}
    dir={dir}
    displayImages={displayImages}
  />
);

const LeadingRowStory = ({ dir, displayImages }) => (
  <LeadingRow
    stories={getNumberPromoFixtures(dir, 2)}
    dir={dir}
    displayImages={displayImages}
  />
);

const RegularRowStory = ({ dir, displayImages }) => (
  <RegularRow
    stories={getNumberPromoFixtures(dir, 4)}
    displayImages={displayImages}
    dir={dir}
  />
);

const Component = ({ RowType, displayImages = true, selectDir }) => {
  return (
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
          <RowType dir={selectDir ?? 'ltr'} displayImages={displayImages} />
        </Grid>
      </ToggleContextProvider>
    </RequestContextProvider>
  );
};

export default {
  title: 'Containers/Front Page Story Row',
  Component,
  parameters: {
    chromatic: { disable: true },
  },
  args: {
    selectDir: 'ltr',
  },
  argTypes: {
    selectDir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl'],
    },
  },
};

export const WithTopRow = props => (
  <Component RowType={TopRowStory} {...props} />
);
export const WithLeadingRow = props => (
  <Component RowType={LeadingRowStory} {...props} />
);
export const WithRegularRow = props => (
  <Component RowType={RegularRowStory} {...props} />
);
export const WithNoImageRow = props => (
  <Component RowType={RegularRowStory} displayImages={false} {...props} />
);
