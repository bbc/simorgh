/* eslint-disable no-template-curly-in-string */
import getAmpDestination from './index';

describe('getAmpDestination', () => {
  it('should construct the correct string for NEWS_PS', () => {
    expect(getAmpDestination({ PS: 598285, GNL: 598287 })).toBe(
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598285, 598287)',
    );
  });
  it('should construct the correct string for SPORTS_PS_TEST', () => {
    expect(getAmpDestination({ PS: 598311, GNL: 598309 })).toBe(
      '$IF($EQUALS($MATCH(${ampGeo}, gbOrUnknown, 0), gbOrUnknown), 598311, 598309)',
    );
  });
});
