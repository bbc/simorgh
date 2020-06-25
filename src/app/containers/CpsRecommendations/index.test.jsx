import React from 'react';
import { render } from '@testing-library/react';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import recommendationData from './recommendations.ltr.json';

import CpsRecommendations from '.';

const singleRecommendationData = [
  {
    assetUri: '/mundo/5331',
    shortHeadline: 'This is a headline',
    imageHref: 'http://c.files.bbci.co.uk/256/727445.jpg',
  },
];

const multipleRecommendationData = recommendationData.items;

const parentGridCols = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 8,
  group5: 8,
};

const renderContainer = (items, hasStoryRecommendations, toggleEnabled) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: toggleEnabled,
    },
  };
  return render(
    <ServiceContext.Provider
      value={{
        script: latinDiacritics,
        service: 'mundo',
        dir: 'ltr',
        recommendations: {
          hasStoryRecommendations,
        },
      }}
    >
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType="STY"
        pathname="/mundo/085965"
        service="mundo"
        statusCode={200}
      >
        <ToggleContext.Provider
          value={{ toggleState, toggleDispatch: jest.fn() }}
        >
          <CpsRecommendations items={items} parentColumns={parentGridCols} />
        </ToggleContext.Provider>
      </RequestContextProvider>
    </ServiceContext.Provider>,
  );
};

describe('CpsRecommendations', () => {
  it('should not render when cpsRecommendations toggle is disabled', () => {
    const toggleEnabled = false;
    const hasStoryRecommendations = true;
    const { container } = renderContainer(
      multipleRecommendationData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should not render when the hasStoryRecommendations flag is disabled for the service', () => {
    const hasStoryRecommendations = false;
    const toggleEnabled = true;
    const { container } = renderContainer(
      multipleRecommendationData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render for multiple recommendation items', () => {
    const toggleEnabled = true;
    const hasStoryRecommendations = true;
    const { container } = renderContainer(
      multipleRecommendationData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render for a single recommendation item', () => {
    const toggleEnabled = true;
    const hasStoryRecommendations = true;
    const { container } = renderContainer(
      singleRecommendationData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
});
