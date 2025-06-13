import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { OptimizelyProvider } from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

import OptimizelyPageViewTracking from '.';

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
};

const ContextWrap = ({ pageType, isAmp, children, service }) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider optimizely={optimizely} isServerSide>
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

describe('Optimizely Page View tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Optimizely track function for Article Page on page render', async () => {
    useOptimizelyVariation.mockReturnValue('variation_1');

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyPageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call Optimizely track function for Article Page on AMP', async () => {
    useOptimizelyVariation.mockReturnValue('variation_1');

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyPageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(0);
    });
  });

  it('should not call Optimizely track function for users not in an experiment', async () => {
    useOptimizelyVariation.mockReturnValue(null);

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <OptimizelyPageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(0);
    });
  });
});
