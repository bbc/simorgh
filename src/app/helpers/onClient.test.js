import { setLocationValue, resetLocationValue } from './tests/setLocationValue';
import onClient from './onClient';

const windowLocation = window.location;

describe('onClient', () => {
  beforeEach(() => {
    resetLocationValue(windowLocation);
  });

  it('returns true when window location is available', () => {
    setLocationValue(true);

    expect(onClient()).toBeTruthy();
  });

  it('returns false when window location is not', () => {
    setLocationValue(false);

    expect(onClient()).not.toBeTruthy();
  });
});
