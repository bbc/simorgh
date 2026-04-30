import Cookie from 'js-cookie';
import {
  ACCOUNT_BANNER_DISMISS_COOKIE,
  ACCOUNT_BANNER_DISMISS_INTERVAL_MS,
  ACCOUNT_BANNER_LAST_DISMISS_COOKIE,
  ACCOUNT_BANNER_MAX_DISMISSALS,
  isAccountPromoBannerVisible,
  setAccountPromoBannerDismissed,
} from '.';

describe('AccountPromotionalBanner utilities', () => {
  describe('isAccountPromoBannerVisible', () => {
    const recently = String(Date.now() - 1000);
    const longAgo = String(
      Date.now() - ACCOUNT_BANNER_DISMISS_INTERVAL_MS - 1000,
    );

    it('returns true when no cookies are present', () => {
      expect(isAccountPromoBannerVisible('')).toBe(true);
    });

    it('returns true when an unrelated cookie is present', () => {
      expect(isAccountPromoBannerVisible('other_cookie=foo')).toBe(true);
    });

    it('returns false when last dismissed within the interval', () => {
      const cookieHeader = `${ACCOUNT_BANNER_DISMISS_COOKIE}=1; ${ACCOUNT_BANNER_LAST_DISMISS_COOKIE}=${recently}`;
      expect(isAccountPromoBannerVisible(cookieHeader)).toBe(false);
    });

    it('returns true once the dismissal interval has elapsed and limit is not reached', () => {
      const cookieHeader = `${ACCOUNT_BANNER_DISMISS_COOKIE}=1; ${ACCOUNT_BANNER_LAST_DISMISS_COOKIE}=${longAgo}`;
      expect(isAccountPromoBannerVisible(cookieHeader)).toBe(true);
    });

    it('returns false when the dismissal limit has been reached', () => {
      const cookieHeader = `${ACCOUNT_BANNER_DISMISS_COOKIE}=${ACCOUNT_BANNER_MAX_DISMISSALS}; ${ACCOUNT_BANNER_LAST_DISMISS_COOKIE}=${longAgo}`;
      expect(isAccountPromoBannerVisible(cookieHeader)).toBe(false);
    });

    it('treats malformed dismissal counts as zero', () => {
      const cookieHeader = `${ACCOUNT_BANNER_DISMISS_COOKIE}=not-a-number`;
      expect(isAccountPromoBannerVisible(cookieHeader)).toBe(true);
    });
  });

  describe('setAccountPromoBannerDismissed', () => {
    beforeEach(() => {
      Cookie.remove(ACCOUNT_BANNER_DISMISS_COOKIE);
      Cookie.remove(ACCOUNT_BANNER_LAST_DISMISS_COOKIE);
    });

    it('initialises the dismissal count and timestamp on first dismissal', () => {
      setAccountPromoBannerDismissed();

      expect(Cookie.get(ACCOUNT_BANNER_DISMISS_COOKIE)).toBe('1');
      expect(
        Number(Cookie.get(ACCOUNT_BANNER_LAST_DISMISS_COOKIE)),
      ).toBeGreaterThan(0);
    });

    it('increments the dismissal count on subsequent dismissals', () => {
      Cookie.set(ACCOUNT_BANNER_DISMISS_COOKIE, '2');

      setAccountPromoBannerDismissed();

      expect(Cookie.get(ACCOUNT_BANNER_DISMISS_COOKIE)).toBe('3');
    });
  });
});
