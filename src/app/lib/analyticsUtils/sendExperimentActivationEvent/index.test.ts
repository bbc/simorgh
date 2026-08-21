import sendBeacon from '../sendBeacon';
import sendExperimentActivationEvent from '.';

jest.mock('../sendBeacon');

describe('sendExperimentActivationEvent', () => {
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
    await sendExperimentActivationEvent(validProps);

    expect(sendBeacon).toHaveBeenCalledTimes(1);
    expect(sendBeacon).toHaveBeenCalledWith(
      expect.objectContaining({
        eventDetails: expect.objectContaining({
          eventName: 'activation',
          eventPublisher: 'viewability',
          experience: {
            engine_id: ['foo.control'],
          },
        }),
      }),
    );
  });

  it('does not send when tracking is disabled', async () => {
    await sendExperimentActivationEvent({
      ...validProps,
      trackingIsEnabled: false,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when experimentVariant is falsy', async () => {
    await sendExperimentActivationEvent({
      ...validProps,
      experimentVariant: null,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when experimentVariant is "off"', async () => {
    await sendExperimentActivationEvent({
      ...validProps,
      experimentVariant: 'off',
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });

  it('does not send when a required ATI prop is missing', async () => {
    await sendExperimentActivationEvent({
      ...validProps,
      pageIdentifier: undefined,
    });

    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
