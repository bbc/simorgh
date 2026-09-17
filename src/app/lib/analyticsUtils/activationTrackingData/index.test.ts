import {
  getActivationTrackingData,
  setActivationTrackingData,
  resetActivationTrackingData,
} from '.';

describe('activationTrackingData', () => {
  afterEach(() => {
    resetActivationTrackingData();
  });

  it('should default to a disabled context', () => {
    expect(getActivationTrackingData()).toEqual({ trackingIsEnabled: false });
  });

  it('should return the most recently set context', () => {
    setActivationTrackingData({
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: true,
      hashedId: 'hashed-id',
    });

    expect(getActivationTrackingData()).toEqual({
      trackingIsEnabled: true,
      pageIdentifier: 'page-identifier',
      producerName: 'producer-name',
      statsDestination: 'stats-destination',
      isSignedIn: true,
      hashedId: 'hashed-id',
    });
  });

  it('should reset back to a disabled context', () => {
    setActivationTrackingData({ trackingIsEnabled: true });
    resetActivationTrackingData();

    expect(getActivationTrackingData()).toEqual({ trackingIsEnabled: false });
  });
});
