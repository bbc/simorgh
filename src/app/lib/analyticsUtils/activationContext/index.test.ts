import {
  getActivationContext,
  setActivationContext,
  resetActivationContext,
} from '.';

describe('activationContext', () => {
  afterEach(() => {
    resetActivationContext();
  });

  it('should default to a disabled context', () => {
    expect(getActivationContext()).toEqual({ trackingIsEnabled: false });
  });

  it('should return the most recently set context', () => {
    setActivationContext({
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: true,
      hashedId: 'hashed-id',
    });

    expect(getActivationContext()).toEqual({
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: true,
      hashedId: 'hashed-id',
    });
  });

  it('should reset back to a disabled context', () => {
    setActivationContext({ trackingIsEnabled: true });
    resetActivationContext();

    expect(getActivationContext()).toEqual({ trackingIsEnabled: false });
  });
});
