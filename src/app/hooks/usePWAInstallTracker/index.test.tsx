import { renderHook } from '@testing-library/react';
import * as useCustomEventTrackerModule from '../useCustomEventTracker';
import usePWAInstallTracker from '.';

const mockTrackEvent = jest.fn();
const mockUseCustomEventTracker = jest.spyOn(
  useCustomEventTrackerModule,
  'default',
);

describe('usePWAInstallTracker', () => {
  let addEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');

    jest.clearAllMocks();
    mockUseCustomEventTracker.mockReturnValue(mockTrackEvent);
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
  });

  it('should initialize useCustomEventTracker with correct eventName', () => {
    renderHook(() => usePWAInstallTracker());

    expect(mockUseCustomEventTracker).toHaveBeenCalledWith({
      eventName: 'pwa-installed',
    });
  });

  it('should add appinstalled event listener on mount', () => {
    renderHook(() => usePWAInstallTracker());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'appinstalled',
      expect.any(Function),
    );
  });

  it('should call trackEvent when appinstalled event is fired', () => {
    renderHook(() => usePWAInstallTracker());

    expect(addEventListenerSpy.mock.calls[0][0]).toBe('appinstalled');

    // Simulate appinstalled event
    const addedHandler = addEventListenerSpy.mock.calls[0][1];
    addedHandler();

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith();
  });

  it('should only track the event once even if appinstalled event is fired multiple times', () => {
    renderHook(() => usePWAInstallTracker());

    const addedHandler = addEventListenerSpy.mock.calls[0][1];

    // Simulate multiple appinstalled events
    addedHandler();
    addedHandler();
    addedHandler();

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith();
  });
});
