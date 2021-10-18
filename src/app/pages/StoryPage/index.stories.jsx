import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { StoryPage } from '..';
import mundoPageData from './fixtureData/mundo';
import persianPageData from './fixtureData/persian';
import russianPageData from './fixtureData/russian';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';

const withSecondaryColumnsKnob = pageData => storyFn => {
  const showTopStories = boolean('Show Top Stories', true);
  const showFeaturedStories = boolean('Show Featured Stories', true);

  const secondaryColumn = {
    ...(showTopStories && {
      topStories: pageData.secondaryColumn.features,
    }),
    ...(showFeaturedStories && {
      features: pageData.secondaryColumn.features,
    }),
  };

  const storyProps = {
    pageData: {
      ...pageData,
      secondaryColumn,
    },
  };
  return storyFn(storyProps);
};

const toggleState = {
  podcastPromo: {
    enabled: true,
  },
};

// eslint-disable-next-line react/prop-types
const Component = ({ pageData, service }) => (
  <ToggleContext.Provider value={{ toggleState, toggleDispatch: () => {} }}>
    <ServiceContextProvider
      // eslint-disable-next-line react/prop-types
      pageLang={pageData.metadata.language}
      service={service}
    >
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        service={service}
        statusCode={200}
        showAdsBasedOnLocation={false}
      >
        <BrowserRouter>
          <StoryPage
            pageType={STORY_PAGE}
            isAmp={false}
            pathname="/path"
            status={200}
            pageData={pageData}
            service={service}
            mostReadEndpointOverride="./data/mundo/mostRead/index.json"
          />
        </BrowserRouter>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContext.Provider>
);

export default {
  Component,
  title: 'Pages/Story Page',
  decorators: [
    withKnobs,
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
};

export const Mundo = props => (
  <Component service="mundo" pageData={mundoPageData} {...props} />
);

Mundo.decorators = [withSecondaryColumnsKnob(mundoPageData)];

export const Persian = props => (
  <Component service="persian" pageData={persianPageData} {...props} />
);

Persian.decorators = [withSecondaryColumnsKnob(persianPageData)];

export const Russian = props => (
  <Component service="russian" pageData={russianPageData} {...props} />
);

Russian.decorators = [withSecondaryColumnsKnob(russianPageData)];
