import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';

import ThemeProvider from '#app/components/ThemeProvider';
import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import portuguesePageData from './fixtureData/portuguese';
import persianPageData from './fixtureData/persian';
import mundoPageData from './fixtureData/mundo';
import StoryPage from './StoryPage';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

const PageWithOptimizely = withOptimizelyProvider(StoryPage);
const Page = withPageWrapper(PageWithOptimizely);

const withSecondaryColumnsKnob = pageData => storyFn => {
  const showTopStories = Boolean('Show Top Stories', true);
  const showFeaturedStories = Boolean('Show Featured Stories', true);

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

const Component = ({ pageData, service }) => {
  return (
    <BrowserRouter>
      <ToggleContext.Provider value={{ toggleState, toggleDispatch: () => {} }}>
        <RequestContextProvider
          isAmp={false}
          service={service}
          pageType={STORY_PAGE}
          bbcOrigin="https://www.test.bbc.com"
        >
          <ServiceContextProvider service={service}>
            <ThemeProvider service={service}>
              <Page pageData={pageData} />
            </ThemeProvider>
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContext.Provider>
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/Story Page',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
  paramerers: {
    chromatic: { diffThreshold: 0.2 },
  },
};

export const Mundo = () => (
  <Component service="mundo" pageData={mundoPageData} />
);

Mundo.decorators = [withSecondaryColumnsKnob(mundoPageData)];

export const Persian = () => (
  <Component service="persian" pageData={persianPageData} />
);

Persian.decorators = [withSecondaryColumnsKnob(persianPageData)];

export const Portuguese = () => (
  <Component service="portuguese" pageData={portuguesePageData} />
);

Portuguese.decorators = [withSecondaryColumnsKnob(portuguesePageData)];
