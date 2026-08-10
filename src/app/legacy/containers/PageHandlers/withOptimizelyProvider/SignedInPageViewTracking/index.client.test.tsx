import { render, waitFor } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import Cookie from 'js-cookie';
import { RequestContext, RequestContextProps } from '#contexts/RequestContext';
import { ServerSideExperiment } from '#app/models/types/global';
import SignedInPageViewTracking from '.';

jest.mock('../isCypress', () => jest.fn().mockReturnValue(false));

const mockOptimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
} satisfies Partial<ReactSDKClient>;

const activeExperiment: ServerSideExperiment = {
  experimentName: 'newswb_ws_article_account_promo_banner',
  variation: 'on',
  enabled: true,
};

const renderWithProvider = (
  serverSideExperiments: ServerSideExperiment[] | null = [activeExperiment],
) =>
  render(
    <RequestContext.Provider
      value={{ serverSideExperiments } as RequestContextProps}
    >
      <OptimizelyProvider
        optimizely={mockOptimizely as unknown as ReactSDKClient}
        isServerSide
      >
        <SignedInPageViewTracking />
      </OptimizelyProvider>
    </RequestContext.Provider>,
  );

describe('SignedInPageViewTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Cookie.remove('ckns_id');
  });

  it('tracks signed-in-page-views once the client is ready when the user is signed in and part of an experiment', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    renderWithProvider();

    await waitFor(() => {
      expect(mockOptimizely.track).toHaveBeenCalledWith('signed-in-page-views');
    });
  });

  it('does not track signed-in-page-views when the user is signed out', async () => {
    renderWithProvider();

    // flush microtasks so a regression that kicks off an async chain would have run by now
    await Promise.resolve();

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.track).not.toHaveBeenCalled();
  });

  it('does not track signed-in-page-views when no experiment applies to this page', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    renderWithProvider([]);

    await Promise.resolve();

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.track).not.toHaveBeenCalled();
  });

  it('does not track signed-in-page-views when the visitor was excluded from the experiment', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    renderWithProvider([
      { ...activeExperiment, enabled: true, variation: 'false' },
    ]);

    await Promise.resolve();

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.track).not.toHaveBeenCalled();
  });

  it('tracks signed-in-page-views only once, even if re-rendered', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    const { rerender } = renderWithProvider();

    await waitFor(() => {
      expect(mockOptimizely.track).toHaveBeenCalledTimes(1);
    });

    rerender(
      <RequestContext.Provider
        value={
          { serverSideExperiments: [activeExperiment] } as RequestContextProps
        }
      >
        <OptimizelyProvider
          optimizely={mockOptimizely as unknown as ReactSDKClient}
          isServerSide
        >
          <SignedInPageViewTracking />
        </OptimizelyProvider>
      </RequestContext.Provider>,
    );

    await waitFor(() => {
      expect(mockOptimizely.onReady).toHaveBeenCalledTimes(1);
    });
    expect(mockOptimizely.track).toHaveBeenCalledTimes(1);
  });
});
