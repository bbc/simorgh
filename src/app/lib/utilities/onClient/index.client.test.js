import onClient from '.';

describe('onClient', () => {
  it('returns true when window location is available', () => {
    expect(onClient()).toBeTruthy();
  });

  it('returns false when window location is not set', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: null,
    });

    expect(onClient()).not.toBeTruthy();
  });
});
