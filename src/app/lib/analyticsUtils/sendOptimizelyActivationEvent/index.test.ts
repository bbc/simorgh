import sendBeacon from '../sendBeacon';
import sendOptimizelyActivationEvent from '.';

jest.mock('../sendBeacon');

describe('sendOptimizelyActivationEvent', () => {
  const validProps = {
    experimentName: 'foo',
    experimentVariant: 'control',
    trackingIsEnabled: true,
    pageIdentifier: 'page-identifier',
    platform: 'canonical' as const,
    producerId: 'producer-id',
    producerName: 'producer-name',
    statsDestination: 'stats-destination',
    service: 'news' as const,
    isSignedIn: true,
    hashedId: 'hashed-id',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('builds and sends the activation beacon when all required props are present', async () => {
    await sendOptimizelyActivationEvent(validProps);

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
        eventDetails: expect.objectContaining({
          eventName: 'activation',
          personalisation: {
            experimentName: 'foo',
            experimentVariant: 'control',
          },
        }),
      }),
    );
  });

  it('does not send when tracking is disabled', async () => {
    await sendOptimizelyActivationEvent({
      ...validProps,
      trackingIsEnabled: false,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when experimentVariant is falsy', async () => {
    await sendOptimizelyActivationEvent({
      ...validProps,
      experimentVariant: null,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when experimentVariant is "off"', async () => {
    await sendOptimizelyActivationEvent({
      ...validProps,
      experimentVariant: 'off',
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when a required ATI prop is missing', async () => {
    await sendOptimizelyActivationEvent({
      ...validProps,
      pageIdentifier: undefined,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
