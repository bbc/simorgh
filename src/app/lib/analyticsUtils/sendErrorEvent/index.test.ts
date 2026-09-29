import sendBeacon from '../sendBeacon';
import sendErrorEvent from '.';

jest.mock('../sendBeacon');

describe('sendErrorEvent', () => {
  const validProps = {
    feature: 'uas',
    errorName: 'save',
    statusCode: 500,
    errorKey: 'unknownTokenKey',
    errorMessage: 'An unknown error occurred.',
    trackingIsEnabled: true,
    pageIdentifier: 'page-identifier',
    producerName: 'producer-name',
    statsDestination: 'stats-destination',
    isSignedIn: true,
    hashedId: 'hashed-id',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('builds and sends the error beacon when all required props are present', async () => {
    await sendErrorEvent(validProps);

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
        eventDetails: expect.objectContaining({
          eventName: 'error',
          eventPublisher: 'viewability',
          event: { category: 'error' },
          error: {
            engine: 'uas',
            name: 'save',
            message: 'An unknown error occurred.',
            code: '500',
            type: 'unknownTokenKey',
          },
        }),
      }),
    );
  });

  it('does not send when tracking is disabled', async () => {
    await sendErrorEvent({ ...validProps, trackingIsEnabled: false });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when a required page prop is missing', async () => {
    await sendErrorEvent({ ...validProps, pageIdentifier: undefined });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('omits optional diagnostics when they are absent', async () => {
    await sendErrorEvent({
      feature: 'uas',
      errorName: 'fetch-status',
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
    });

    expect(sendBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
        eventDetails: expect.objectContaining({
          error: {
            engine: 'uas',
            name: 'fetch-status',
          },
        }),
      }),
    );
  });
});
