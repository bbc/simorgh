import { renderHook } from '@testing-library/react';
import { onlineManager } from '@tanstack/react-query';
import useErrorTracking from '.';
import sendErrorEvent from '../../lib/analyticsUtils/sendErrorEvent';
import UasError from '../../lib/uasApi/errors';

jest.mock('../../lib/analyticsUtils/sendErrorEvent');

jest.mock('../useTrackingToggle', () => ({
  __esModule: true,
  default: () => ({ trackingIsEnabled: true }),
}));

jest.mock('../../lib/analyticsUtils/extractATITrackingProps', () => ({
  __esModule: true,
  default: () => ({
    pageIdentifier: 'page-id',
    producerName: 'producer-name',
    statsDestination: 'stats-destination',
    isSignedIn: true,
    hashedId: 'hashed-id',
  }),
}));

const mockSendErrorEvent = sendErrorEvent as jest.MockedFunction<
  typeof sendErrorEvent
>;

describe('useErrorTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sends a structured error event with the tracking context', () => {
    const onlineSpy = jest
      .spyOn(onlineManager, 'isOnline')
      .mockReturnValue(true);
    const { result } = renderHook(() => useErrorTracking());

    result.current({
      error: new TypeError('boom'),
      feature: 'uas',
      action: 'save',
    });

    expect(mockSendErrorEvent).toHaveBeenCalledTimes(1);
    expect(mockSendErrorEvent).toHaveBeenCalledWith({
      feature: 'uas',
      errorName: 'save',
      statusCode: undefined,
      errorKey: undefined,
      errorMessage: 'boom',
      trackingIsEnabled: true,
      pageIdentifier: 'page-id',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: true,
      hashedId: 'hashed-id',
    });

    onlineSpy.mockRestore();
  });

  it('forwards the status code, service code and message from a UasError', () => {
    const onlineSpy = jest
      .spyOn(onlineManager, 'isOnline')
      .mockReturnValue(true);
    const { result } = renderHook(() => useErrorTracking());

    result.current({
      error: new UasError(500, {
        key: 'unknownTokenKey',
        message: 'An unknown error occurred.',
      }),
      feature: 'uas',
      action: 'remove',
    });

    expect(mockSendErrorEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        feature: 'uas',
        errorName: 'remove',
        statusCode: 500,
        errorKey: 'unknownTokenKey',
        errorMessage: 'An unknown error occurred.',
      }),
    );

    onlineSpy.mockRestore();
  });

  it.each([null, undefined, 'not-an-error'])(
    'does not track when the error is %p',
    invalidError => {
      const onlineSpy = jest
        .spyOn(onlineManager, 'isOnline')
        .mockReturnValue(true);
      const { result } = renderHook(() => useErrorTracking());

      result.current({
        error: invalidError,
        feature: 'uas',
        action: 'save',
      });

      expect(mockSendErrorEvent).not.toHaveBeenCalled();

      onlineSpy.mockRestore();
    },
  );

  it('does not track connectivity failures while offline', () => {
    const onlineSpy = jest
      .spyOn(onlineManager, 'isOnline')
      .mockReturnValue(false);
    const { result } = renderHook(() => useErrorTracking());

    result.current({
      error: new Error('offline'),
      feature: 'uas',
      action: 'save',
    });

    expect(mockSendErrorEvent).not.toHaveBeenCalled();

    onlineSpy.mockRestore();
  });
});
