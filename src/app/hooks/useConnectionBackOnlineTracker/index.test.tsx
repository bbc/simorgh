import { renderHook } from '@testing-library/react';
import useConnectionBackOnlineTracker from '.';
import * as useCustomEventTrackerModule from '../useCustomEventTracker';
import useNetworkStatusTracker from '../useNetworkStatusTracker';

jest.mock('../useNetworkStatusTracker', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isOnline: true, networkType: 'unknown' })),
}));

jest.mock('../useTrackingToggle', () => ({
  __esModule: true,
  default: jest.fn(() => ({ trackingIsEnabled: true })),
}));

const mockTrackEvent = jest.fn();
const mockUseCustomEventTracker = jest.spyOn(
  useCustomEventTrackerModule,
  'default',
);

describe('useConnectionBackOnlineTracker', () => {
  let originalVisibility: PropertyDescriptor | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCustomEventTracker.mockReturnValue(mockTrackEvent);

    // Ensure page is considered visible for tracking to fire
    originalVisibility = Object.getOwnPropertyDescriptor(
      document,
      'visibilityState',
    );
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      configurable: true,
    });
  });

  afterEach(() => {
    if (originalVisibility) {
      Object.defineProperty(document, 'visibilityState', originalVisibility);
    }
  });

  it('should initialize useCustomEventTracker with correct eventName', () => {
    renderHook(() => useConnectionBackOnlineTracker());

    expect(mockUseCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'network-connection-back-online',
    });
  });

  it('should track event when offline -> online transition happens', () => {
    const networkStatusMock = useNetworkStatusTracker as jest.Mock;

    // Initial render: offline
    networkStatusMock.mockImplementation(() => ({
      isOnline: false,
      networkType: '3g',
    }));

    const { rerender } = renderHook(() => useConnectionBackOnlineTracker());

    expect(mockTrackEvent).not.toHaveBeenCalled();

    // Rerender: transition to online with new network type
    networkStatusMock.mockImplementation(() => ({
      isOnline: true,
      networkType: '4g',
    }));

    rerender();

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith('4g');
  });

  it('should not track event when offline -> online transition happens if page is not visible', () => {
    const networkStatusMock = useNetworkStatusTracker as jest.Mock;

    networkStatusMock.mockImplementation(() => ({
      isOnline: false,
      networkType: '3g',
    }));

    const { rerender } = renderHook(() => useConnectionBackOnlineTracker());

    expect(mockTrackEvent).not.toHaveBeenCalled();

    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden',
      configurable: true,
    });

    networkStatusMock.mockImplementation(() => ({
      isOnline: true,
      networkType: '4g',
    }));

    rerender();

    expect(mockTrackEvent).not.toHaveBeenCalled();
  });
});
