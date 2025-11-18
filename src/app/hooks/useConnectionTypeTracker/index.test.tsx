// Mock useTrackingToggle so tracking is always enabled
import { renderHook } from '@testing-library/react';
import useConnectionTypeTracker from '.';
import useCustomEventTracker from '../useCustomEventTracker';
import useNetworkStatusTracker from '../useNetworkStatusTracker';

jest.mock('../useTrackingToggle', () => ({
  __esModule: true,
  default: jest.fn(() => ({ trackingIsEnabled: true })),
}));

jest.mock('../useNetworkStatusTracker', () => ({
  __esModule: true,
  default: jest.fn(() => ({ networkType: '3g' })),
}));

const mockTrackEvent = jest.fn();
jest.mock('../useCustomEventTracker', () => ({
  __esModule: true,
  default: jest.fn(() => mockTrackEvent),
}));

describe('useConnectionTypeTracker', () => {
  beforeEach(() => {
    mockTrackEvent.mockClear();
  });

  it('should initialize useCustomEventTracker with correct eventName', () => {
    renderHook(() => useConnectionTypeTracker());

    expect(useCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'network-effective-type',
    });
  });

  it('should use correct connection type as event payload', () => {
    renderHook(() => useConnectionTypeTracker());

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith('3g');
  });

  it('should only track once', () => {
    const networkStatusMock = useNetworkStatusTracker as jest.Mock;
    networkStatusMock.mockImplementation(() => ({ networkType: '3g' }));

    const { rerender } = renderHook(() => useConnectionTypeTracker());

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith('3g');

    rerender();

    networkStatusMock.mockImplementation(() => ({ networkType: '4g' }));

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).not.toHaveBeenCalledWith('4g');
  });
});
