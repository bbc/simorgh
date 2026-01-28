import { OptimizelyProvider, ReactSDKClient } from '@optimizely/react-sdk';
import { render, waitFor } from '../../react-testing-library-with-providers';
import VisitEventTracking from './index';

// create a mock optimizely client with a fake track function to check if it's called
const mockOptimizely = {
  track: jest.fn(),
} satisfies Partial<ReactSDKClient>;
// helper function to render the component wrapped in the optimizely context , using the mock client
const renderWithOptimizely = (optimizely?: Partial<ReactSDKClient>) =>
  render(
    <OptimizelyProvider optimizely={optimizely as ReactSDKClient}>
      <VisitEventTracking />
    </OptimizelyProvider>,
  );

describe('Optimizely VisitEventTracking', () => {
  // save the original date.now function and a copy of localStorage to restore after each test
  const originalDateNow = Date.now;
  const originalLocalStorage = { ...window.localStorage };
  // variables for mocked getItem and setItem functions
  let getItemMock: jest.Mock;
  let setItemMock: jest.Mock;

  // before each test:
  // clear any previous mock calls
  // mock Date.now to return a fixed timestamp (1000000) so tests are predictable
  // create new jest mock functions for localStorage getItem and setItem
  // replace window.localStorage with an object using the mocked functions
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(1000000);

    getItemMock = jest.fn();
    setItemMock = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
        setItem: setItemMock,
      },
      writable: true,
    });
  });

  // after each test:
  // restore all jest mocks to their original states
  // restore the original Date.now
  // restore the original localStorage
  afterEach(() => {
    jest.restoreAllMocks();
    Date.now = originalDateNow;
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });

  // if there is no previous visit in storage, the component should track a visit and update the timestamp
  it('tracks visit and sets last_visit_ts if no last visit exists', async () => {
    getItemMock.mockReturnValueOnce(null);

    renderWithOptimizely(mockOptimizely);

    await waitFor(() => {
      expect(mockOptimizely.track).toHaveBeenCalledWith('visit');
      expect(setItemMock).toHaveBeenCalledWith('last_visit_ts', '1000000');
    });
  });

  // if the last visit was more than an hour ago, the component should track a new visit and update the timestamp
  it('tracks visit and sets last_visit_ts if last visit is older than timeout', async () => {
    const oldTimestamp = 1000000 - 61 * 60 * 1000; // 61 minutes ago
    getItemMock.mockReturnValueOnce(String(oldTimestamp));

    renderWithOptimizely(mockOptimizely);

    await waitFor(() => {
      expect(mockOptimizely.track).toHaveBeenCalledWith('visit');
      expect(setItemMock).toHaveBeenCalledWith('last_visit_ts', '1000000');
    });
  });

  // if the last visit was less than an hour ago, the component should not track a new visit or update the timestamp
  it('does not track visit if last visit is within timeout', async () => {
    const recentTimestamp = 1000000 - 30 * 60 * 1000; // 30 minutes ago
    getItemMock.mockReturnValueOnce(String(recentTimestamp));

    renderWithOptimizely(mockOptimizely);

    await waitFor(() => {
      expect(mockOptimizely.track).not.toHaveBeenCalled();
      expect(setItemMock).not.toHaveBeenCalledWith(
        'last_visit_ts',
        expect.any(String),
      );
    });
  });

  // if the optimizely client is missing, the component should not crash and timestamp should still update
  // this is to ensure the tracking logic remains consistent and without duplicates and extra events.
  // the visit is still recorded locally so the next visit won't trigger another event immediately after the optimizely event becomes available again
  it('does not throw if optimizely is undefined', async () => {
    getItemMock.mockReturnValueOnce(null);

    expect(() => renderWithOptimizely(undefined)).not.toThrow();
    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith('last_visit_ts', '1000000');
    });
  });
  // should not render anything to the DOM
  it('returns null', () => {
    getItemMock.mockReturnValueOnce(null);
    const { container } = renderWithOptimizely(mockOptimizely);
    expect(container).toBeEmptyDOMElement();
  });
});
