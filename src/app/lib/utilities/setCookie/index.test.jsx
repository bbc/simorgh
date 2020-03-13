import Cookie from 'js-cookie';
import setCookie, { removeDomainRestrictions } from '.';

const cookieSpy = jest.spyOn(Cookie, 'set');

describe('setCookie Assertion Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Setting cookie with domain and duration', () => {
    it('should return cookie with domain and expiration of 1 year', () => {
      setCookie('test', '111');
      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: '.bbc.com',
        expires: 365,
      });
    });
    it('should return cookie with domain and expiration of 1 week', () => {
      setCookie('test', '111', 7);
      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: '.bbc.com',
        expires: 7,
      });
    });
  });
  describe('Domain Restrictions', () => {
    it('should return .bbc.com as the domain given a .bbc.com link', () => {
      expect(removeDomainRestrictions('www.test.bbc.com')).toBe('.bbc.com');
    });

    it('should return the given domain if it is not a .bbc.com link', () => {
      expect(removeDomainRestrictions('www.foo.com')).toBe('www.foo.com');
    });
  });
});
