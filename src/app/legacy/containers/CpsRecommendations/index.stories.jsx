import React from 'react';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import services from '#server/utilities/serviceConfigs';
import mundoRecommendationsData from '../../../../../data/mundo/recommendations/index.json';
import arabicRecommendationsData from './fixtures/recommendations.rtl.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import newsMultipleItems from './newsFixture';
import CpsRecommendations from '.';
import ThemeProvider from '../../../components/ThemeProvider';

const Component = ({ items, service, dir }) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: true,
    },
    eventTracking: {
      enabled: false,
    },
  };
  const serviceContextStub = {
    service,
    script: services[service].default.script,
    dir: services[service].default.dir,
    recommendations: {
      hasStoryRecommendations: true,
      skipLink: {
        text:
          service === 'news'
            ? 'Skip recommendations and continue reading'
            : services[service].default.recommendations.skipLink.text,
        endTextVisuallyHidden:
          service === 'news'
            ? 'End of recommendations'
            : services[service].default.recommendations.skipLink
                .endTextVisuallyHidden,
      },
    },
    translations: {
      recommendationTitle:
        services[service].default.translations.recommendationTitle,
    },
  };
  const parentGridCols = {
    group0: 8,
    group1: 8,
    group2: 8,
    group3: 8,
    group4: 8,
    group5: 8,
  };
  return (
    <div dir={dir}>
      <ThemeProvider service={service}>
        <ServiceContext.Provider value={serviceContextStub}>
          <RequestContextProvider
            isAmp={false}
            pageType={STORY_PAGE}
            service={service}
            pathname="/pathname"
          >
            <ToggleContext.Provider
              value={{ toggleState, toggleDispatch: () => {} }}
            >
              <CpsRecommendations
                items={items}
                parentColumns={parentGridCols}
              />
            </ToggleContext.Provider>
          </RequestContextProvider>
        </ServiceContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default {
  Component,
  title: 'Containers/CPS Recommendations',
  parameters: { chromatic: { disable: true } },
};

export const NewsSingleItem = () => (
  <Component items={[newsMultipleItems[0]]} service="news" dir="ltr" />
);

export const NewsMultipleItems = () => (
  <Component items={newsMultipleItems} service="news" dir="ltr" />
);

export const MultipleItems = () => (
  <Component items={mundoRecommendationsData} service="mundo" dir="ltr" />
);
export const SingleItem = () => (
  <Component items={[mundoRecommendationsData[0]]} service="mundo" dir="ltr" />
);
export const MultipleItemsRTL = () => (
  <Component items={arabicRecommendationsData} service="arabic" dir="rtl" />
);
export const SingleItemRTL = () => (
  <Component
    items={[arabicRecommendationsData[0]]}
    service="arabic"
    dir="rtl"
  />
);
