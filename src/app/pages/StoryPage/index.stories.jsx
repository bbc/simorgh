import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';

import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import portuguesePageData from './fixtureData/portuguese';
import persianPageData from './fixtureData/persian';
import mundoPageData from './fixtureData/mundo';
import StoryPage from './StoryPage';

const PageWithOptimizely = withOptimizelyProvider(StoryPage);
const Page = withPageWrapper(PageWithOptimizely);

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
  mostRead: {
    enabled: true,
  },
  frostedPromo: {
    enabled: true,
    value: 1,
  },
};

// eslint-disable-next-line react/prop-types
const Component = ({ pageData, service }) => (
  <BrowserRouter>
    <ToggleContext.Provider value={{ toggleState, toggleDispatch: () => {} }}>
      <ServiceContextProvider service={service}>
        <UserContextProvider>
          <RequestContextProvider
            isAmp={false}
            service={service}
            pageType={STORY_PAGE}
            bbcOrigin="https://www.test.bbc.com"
          >
            <Page
              pageData={pageData}
              mostReadEndpointOverride="./data/mundo/mostRead/index.json"
            />
          </RequestContextProvider>
        </UserContextProvider>
      </ServiceContextProvider>
    </ToggleContext.Provider>
  </BrowserRouter>
);

export default {
  Component,
  title: 'Pages/Story Page',
  parameters: { chromatic: { disable: true } },
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

export const Portuguese = props => (
  <Component service="portuguese" pageData={portuguesePageData} {...props} />
);

Portuguese.decorators = [withSecondaryColumnsKnob(portuguesePageData)];
