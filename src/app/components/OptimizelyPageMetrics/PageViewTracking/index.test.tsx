import { PropsWithChildren } from 'react';
import { render, waitFor } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { PageTypes, Services } from '#app/models/types/global';

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
