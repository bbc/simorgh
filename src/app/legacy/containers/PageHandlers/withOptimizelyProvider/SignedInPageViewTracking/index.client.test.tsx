import { render } from '@testing-library/react';
import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import Cookie from 'js-cookie';
import SignedInPageViewTracking from '.';

jest.mock('../isCypress', () => jest.fn().mockReturnValue(false));

const mockOptimizely = {
  onReady: jest.fn(() => Promise.resolve()),
  track: jest.fn(),
} satisfies Partial<ReactSDKClient>;

const renderWithProvider = () =>
  render(
    <OptimizelyProvider
      optimizely={mockOptimizely as unknown as ReactSDKClient}
      isServerSide
    >
      <SignedInPageViewTracking />
    </OptimizelyProvider>,
  );

describe('SignedInPageViewTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Cookie.remove('ckns_id');
  });

  it('tracks signed-in-page-views once the client is ready when the user is signed in', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    renderWithProvider();
    await mockOptimizely.onReady();

    expect(mockOptimizely.track).toHaveBeenCalledWith('signed-in-page-views');
  });

  it('does not track signed-in-page-views when the user is signed out', async () => {
    renderWithProvider();
    await mockOptimizely.onReady();

    expect(mockOptimizely.track).not.toHaveBeenCalled();
  });

  it('tracks signed-in-page-views only once, even if re-rendered', async () => {
    Cookie.set('ckns_id', 'signed-in-token');

    const { rerender } = renderWithProvider();
    await mockOptimizely.onReady();
    rerender(
      <OptimizelyProvider
        optimizely={mockOptimizely as unknown as ReactSDKClient}
        isServerSide
      >
        <SignedInPageViewTracking />
      </OptimizelyProvider>,
    );
    await mockOptimizely.onReady();

    expect(mockOptimizely.track).toHaveBeenCalledTimes(1);
  });
});
