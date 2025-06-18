import Cookie from 'js-cookie';
import {
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';
import setCookie, { getCookieDomain } from '.';

const cookieSpy = jest.spyOn(Cookie, 'set');

describe('setCookie Assertion Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Setting cookie with domain and duration', () => {
    it('should return cookie with domain and expiration of 1 year', () => {
      setCookie({ name: 'test', value: '111' });
      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: 'localhost',
        expires: 365,
        sameSite: 'Lax',
      });
    });
    it('should return cookie with domain and expiration of 1 week', () => {
      setCookie({ name: 'test', value: '111', expires: 7 });
      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: 'localhost',
        expires: 7,
        sameSite: 'Lax',
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

  describe('Setting cookie with sameSite and secure attribute when https', () => {
    const windowLocation = window.location;

    afterEach(() => {
      resetWindowValue('location', windowLocation);
    });

    it('should return cookie with domain, expiration of 1 year, sameSite=None and secure=true', () => {
      setWindowValue('location', {
        protocol: 'https:',
      });

      setCookie({ name: 'test', value: '111', sameSite: 'None' });

      expect(cookieSpy).toHaveBeenCalledWith('test', '111', {
        domain: 'localhost',
        expires: 365,
        sameSite: 'None',
        secure: true,
      });
    });
  });
});
