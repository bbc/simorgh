import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import WithTimeMachine from '#testHelpers/withTimeMachine';

import { STORY_PAGE } from '#app/routes/utils/pageTypes';

import { ToggleContext } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import portuguesePageData from './fixtureData/portuguese';
import persianPageData from './fixtureData/persian';
import mundoPageData from './fixtureData/mundo';
import StoryPage from './StoryPage';
import withServicesDecorator from '#storybook/withServicesDecorator';
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

// eslint-disable-next-line react/prop-types
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
            <Page pageData={pageData} />
          </ServiceContextProvider>
        </RequestContextProvider>
      </ToggleContext.Provider>
    </BrowserRouter>
  );
};

export default {
  Component,
  title: 'Pages/Story Page',
  decorators: [
    withServicesDecorator(),
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
