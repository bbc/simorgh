import React, { PropsWithChildren } from 'react';
import { render, waitFor } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import { PageTypes, Services } from '#app/models/types/global';

import PageViewTracking from '.';

jest.mock('#hooks/useOptimizelyVariation', () => jest.fn(() => null));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
} satisfies Partial<ReactSDKClient>;

interface Props {
  pageType: PageTypes;
  isAmp: boolean;
  service: Services;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const ContextWrap = ({
  pageType,
  isAmp,
  children,
  service,
  mockOptimizely = optimizely,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
    isAmp={isAmp}
    pageType={pageType}
    service={service}
    pathname="/pathname"
  >
    <OptimizelyProvider
      optimizely={mockOptimizely as ReactSDKClient}
      isServerSide
    >
      {children}
    </OptimizelyProvider>
  </RequestContextProvider>
);

describe('Optimizely Page View tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call Optimizely track function for Article Page on page render', async () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variation_1');

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <PageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call Optimizely track function for users not in an experiment', async () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue(null);

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp={false}>
        <PageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(0);
    });
  });
});
