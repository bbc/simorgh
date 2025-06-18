import React, { PropsWithChildren } from 'react';
import { render, waitFor } from '@testing-library/react';
import {
  OptimizelyDecision,
  OptimizelyProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes, Services } from '#app/models/types/global';

import PageViewTracking from '.';

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
  decideAll: jest.fn(() => ({
    mockExperiment1: { variationKey: 'variation_1' } as OptimizelyDecision,
    mockExperiment2: { variationKey: 'variation_1' } as OptimizelyDecision,
  })),
} satisfies Partial<ReactSDKClient>;

jest.mock('./experiments', () => ({
  experiments: ['mockExperiment1', 'mockExperiment2'],
}));

interface Props {
  pageType: PageTypes;
  service: Services;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const ContextWrap = ({
  pageType,
  children,
  service,
  mockOptimizely = optimizely,
}: PropsWithChildren<Props>) => (
  <RequestContextProvider
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
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <PageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(1);
      expect(optimizely.track).toHaveBeenCalledWith('page-views');
    });
  });

  it('should not call Optimizely track function for users not in an experiment', async () => {
    const customOptimizely = {
      ...optimizely,
      decideAll: jest.fn(() => ({
        mockExperiment1: { variationKey: 'off' },
        mockExperiment2: { variationKey: 'off' },
      })),
    };
    render(
      <ContextWrap
        pageType={ARTICLE_PAGE}
        service="news"
        // fix?
        mockOptimizely={customOptimizely as unknown as ReactSDKClient}
      >
        <PageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(0);
      expect(optimizely.track).not.toHaveBeenCalledWith('page-views');
    });
  });
});
