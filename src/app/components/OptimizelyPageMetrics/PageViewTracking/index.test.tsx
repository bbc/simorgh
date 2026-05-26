import type { PropsWithChildren } from 'react';

import { OptimizelyProvider, type ReactSDKClient } from '@optimizely/react-sdk';
import { render, waitFor } from '@testing-library/react';

import type { PageTypes, Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#contexts/RequestContext';
import PageViewTracking from '.';

const optimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
  setUser: jest.fn(() => Promise.resolve()),
} satisfies Partial<ReactSDKClient>;

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
  const originalDateNow = Date.now;

  beforeEach(() => {
    // reset mocks and storage so visit checks are deterministic
    jest.clearAllMocks();
    localStorage.clear();
    jest.spyOn(Date, 'now').mockReturnValue(1000000);
  });

  afterEach(() => {
    // restore global mocks after each test
    jest.restoreAllMocks();
    Date.now = originalDateNow;
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

  // when visit tracking is enabled, visit should be sent before page view
  it('should track visit before page view when visit tracking is enabled', async () => {
    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <PageViewTracking trackVisit />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(2);
      expect(optimizely.track.mock.calls[0][0]).toBe('visit');
      expect(optimizely.track.mock.calls[1][0]).toBe('page-views');
      expect(localStorage.getItem('last_visit_ts')).toBe('1000000');
    });
  });

  // within the timeout window, the visit should not be sent again
  it('should not track a visit within the timeout but updates activity', async () => {
    // use 10 minutes so the timestamp stays positive with the mocked Date.now
    const recentTimestamp = 1000000 - 10 * 60 * 1000; // 10 minutes ago
    localStorage.setItem('last_visit_ts', String(recentTimestamp));

    render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <PageViewTracking trackVisit />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(optimizely.track).toHaveBeenCalledTimes(1);
      expect(optimizely.track).toHaveBeenCalledWith('page-views');
      expect(optimizely.track).not.toHaveBeenCalledWith('visit');
      expect(localStorage.getItem('last_visit_ts')).toBe('1000000');
    });
  });

  it('should return null', async () => {
    const { container } = render(
      <ContextWrap pageType={ARTICLE_PAGE} service="news">
        <PageViewTracking />
      </ContextWrap>,
    );

    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
