import React from 'react';
import { render } from '@testing-library/react';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import recommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';

import CpsRecommendations from '.';

const parentColumns = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 12,
  group5: 12,
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
          <CpsRecommendations items={items} parentColumns={parentColumns} />
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
      recommendationsData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should not render when the hasStoryRecommendations flag is disabled for the service', () => {
    const hasStoryRecommendations = false;
    const toggleEnabled = true;

    const { container } = renderContainer(
      recommendationsData,
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render when there is no recommendations data', () => {
    const hasStoryRecommendations = false;
    const toggleEnabled = true;

    const { container } = renderContainer(
      [],
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });

  describe('should render when cpsRecommendations toggle and hasStoryRecommendations flag are both true', () => {
    const toggleEnabled = true;
    const hasStoryRecommendations = true;

    it('for multiple items', () => {
      const { container } = renderContainer(
        recommendationsData,
        hasStoryRecommendations,
        toggleEnabled,
      );
      expect(container).toMatchSnapshot();
    });
    it('for a single item', () => {
      const { container } = renderContainer(
        [recommendationsData[0]],
        hasStoryRecommendations,
        toggleEnabled,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
