import Cookie from 'js-cookie';
import setCookie, { getCookieDomain } from '.';

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
        sameSite: 'None',
        secure: false,
      });
    });
    it('should return cookie with domain and expiration of 1 week', () => {
      setCookie('test', '111', 7);
      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: '.bbc.com',
        expires: 7,
        sameSite: 'None',
        secure: false,
      });
    });
  });
  describe('Domain Restrictions', () => {
    it('should return .bbc.com as the domain given a .bbc.com link', () => {
      expect(getCookieDomain('www.test.bbc.com')).toBe('.bbc.com');
    });
    it('should return the given domain if it is not a .bbc.com link', () => {
      expect(getCookieDomain('www.foo.com')).toBe('www.foo.com');
    });
    it('should return the domain exactly as .bbc.com if domain ends with .bbc.com', () => {
      expect(getCookieDomain('anysubdomain.bbc.com')).toBe('.bbc.com');
    });
    it('should return the domain exactly as .bbc.co.uk if domain ends with .bbc.co.uk', () => {
      expect(getCookieDomain('anysubdomain.bbc.co.uk')).toBe('.bbc.co.uk');
    });
    it('should return exactly the same domain given if the domain is anything else', () => {
      expect(getCookieDomain('localhost')).toBe('localhost');
    });
  });
});
