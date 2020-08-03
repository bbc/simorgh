import React from 'react';
import { storiesOf } from '@storybook/react';

import CpsRecommendations from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import mundoRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';
import arabicRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.rtl.json';

const renderRecommendations = (items, service, dir) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: true,
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
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          isAmp={false}
          pageType="STY"
          service={service}
          pathname="/pathname"
        >
          <ToggleContext.Provider
            value={{ toggleState, toggleDispatch: () => {} }}
          >
            <CpsRecommendations items={items} parentColumns={parentGridCols} />
          </ToggleContext.Provider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </div>
  );
};

storiesOf('Containers|CPS Recommendations/LTR (mundo)', module)
  .addParameters({ chromatic: { disable: true } })
  .add('multiple items', () =>
    renderRecommendations(mundoRecommendationsData, 'mundo', 'ltr'),
  )
  .add('single item', () =>
    renderRecommendations([mundoRecommendationsData[0]], 'mundo', 'ltr'),
  );

storiesOf('Containers|CPS Recommendations/RTL (arabic)', module)
  .addParameters({ chromatic: { disable: true } })
  .add('multiple items', () =>
    renderRecommendations(arabicRecommendationsData, 'arabic', 'rtl'),
  )
  .add('single item', () =>
    renderRecommendations([arabicRecommendationsData[0]], 'arabic', `rtl`),
  );
