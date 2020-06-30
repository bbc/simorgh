import React from 'react';
import { render } from '@testing-library/react';
import { latinDiacritics } from '@bbc/gel-foundations/scripts';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import CpsRecommendations from '.';

const renderContainer = (hasStoryRecommendations, toggleEnabled) => {
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
          <CpsRecommendations />
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
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should not render when the hasStoryRecommendations flag is disabled for the service', () => {
    const hasStoryRecommendations = false;
    const toggleEnabled = true;
    const { container } = renderContainer(
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should render when cpsRecommendations toggle and hasStoryRecommendations flag are both true', () => {
    const toggleEnabled = true;
    const hasStoryRecommendations = true;
    const { container } = renderContainer(
      hasStoryRecommendations,
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
});
