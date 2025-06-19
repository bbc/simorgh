import React, { PropsWithChildren } from 'react';
import { screen, waitFor } from '@testing-library/react';
import {
  OptimizelyDecision,
  OptimizelyProvider,
  ReactSDKClient,
} from '@optimizely/react-sdk';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { render } from '../react-testing-library-with-providers';
import OptimizelyPageMetrics from '.';

jest.mock('./experimentsForPageMetrics', () => ({
  experimentsForPageMetrics: ['mockExperiment1', 'mockExperiment2'],
}));

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
  decideAll: jest.fn(() => ({
    mockExperiment1: { variationKey: 'variation_1' } as OptimizelyDecision,
    mockExperiment2: { variationKey: 'variation_1' } as OptimizelyDecision,
  })),
} satisfies Partial<ReactSDKClient>;

jest.mock('./PageCompleteTracking', () => () => (
  <div data-testid="page-complete-tracking" />
));
jest.mock('./ScrollDepthTracking', () => () => (
  <div data-testid="scroll-depth-tracking" />
));
jest.mock('./PageViewTracking', () => () => (
  <div data-testid="page-view-tracking" />
));

interface Props {
  pageType: PageTypes;
  service: Services;
  isAmp?: boolean;
  mockOptimizely?: Partial<ReactSDKClient>;
}

const ContextWrap = ({
  pageType,
  children,
  service,
  isAmp,
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

describe('OptimizelyPageMetrics', () => {
  it('returns null when isAmp is true', async () => {
    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news" isAmp>
        <OptimizelyPageMetrics trackPageView trackPageDepth trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  it('renders no tracking components by default when all tracking flags are false', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.queryByTestId('page-complete-tracking')).toBeNull();
      expect(screen.queryByTestId('scroll-depth-tracking')).toBeNull();
      expect(screen.queryByTestId('page-view-tracking')).toBeNull();
    });
  });

  it('renders PageCompleteTracking when trackPageComplete is true', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
    });
  });

  it('renders ScrollDepthTracking when trackPageDepth is true', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageDepth />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
    });
  });

  it('renders PageViewTracking when trackPageView is true', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
    });
  });

  it('renders all tracking components when all flags are true', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <OptimizelyPageMetrics trackPageComplete trackPageDepth trackPageView />
      </ContextWrap>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('page-complete-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('scroll-depth-tracking')).toBeInTheDocument();
      expect(screen.getByTestId('page-view-tracking')).toBeInTheDocument();
    });
  });

  // test to make sure service doesn'r break if useDesicison comes back undefined.
});
