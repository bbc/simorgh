import React from 'react';
import { storiesOf } from '@storybook/react';

import CpsRecommendations from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import mundoRecommendationsData from './recommendations.ltr.json';
import arabicRecommendationsData from './recommendations.rtl.json';

const renderRecommendations = (items, service) => {
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
  );
};

storiesOf('Containers|CPS Recommendations', module)
  .addParameters({ chromatic: { disable: true } })
  .add('mundo (ltr)', () =>
    renderRecommendations(mundoRecommendationsData.items, 'mundo'),
  )
  .add('arabic (ltr)', () =>
    renderRecommendations(arabicRecommendationsData.items, 'arabic'),
  );
