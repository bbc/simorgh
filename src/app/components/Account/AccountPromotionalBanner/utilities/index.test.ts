import { runInNewContext } from 'vm';
import {
  isAccountPromoBannerVisible,
  setAccountPromoBannerDismissed,
  ACCOUNT_BANNER_DISMISS_KEY,
  ACCOUNT_BANNER_LAST_DISMISS_KEY,
  ACCOUNT_BANNER_MAX_DISMISSALS,
  ACCOUNT_BANNER_DISMISS_INTERVAL_MS,
  DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
  buildAccountBannerClientScript,
} from '.';

describe('AccountPromotionalBanner utilities', () => {
  beforeEach(() => {
    localStorage.removeItem(ACCOUNT_BANNER_DISMISS_KEY);
    localStorage.removeItem(ACCOUNT_BANNER_LAST_DISMISS_KEY);
  });

  describe('isAccountPromoBannerVisible', () => {
    it('returns true when no cookies are present', () => {
      expect(
        isAccountPromoBannerVisible({
          cookies: '',
          dismissalCount: null,
          lastDismissed: null,
        }),
      ).toBe(true);
    });

    it('returns true when an unrelated cookie is present', () => {
      expect(
        isAccountPromoBannerVisible({
          cookies: 'other_cookie=value',
          dismissalCount: null,
          lastDismissed: null,
        }),
      ).toBe(true);
    });

    it('returns false when the signed-in cookie is present', () => {
      expect(
        isAccountPromoBannerVisible({
          cookies: 'ckns_id=abc123',
          dismissalCount: null,
          lastDismissed: null,
        }),
      ).toBe(false);
    });

    it('returns false when last dismissed within the interval', () => {
      const now = Date.now();
      expect(
        isAccountPromoBannerVisible({
          cookies: '',
          dismissalCount: '1',
          lastDismissed: `${now}`,
        }),
      ).toBe(false);
    });

    it('returns true once the dismissal interval has elapsed and limit is not reached', () => {
      const past = Date.now() - (ACCOUNT_BANNER_DISMISS_INTERVAL_MS + 1000);
      expect(
        isAccountPromoBannerVisible({
          cookies: '',
          dismissalCount: '1',
          lastDismissed: `${past}`,
        }),
      ).toBe(true);
    });

    it('returns false when the dismissal limit has been reached', () => {
      expect(
        isAccountPromoBannerVisible({
          cookies: '',
          dismissalCount: `${ACCOUNT_BANNER_MAX_DISMISSALS}`,
          lastDismissed: null,
        }),
      ).toBe(false);
    });

    it('treats malformed dismissal counts as zero', () => {
      expect(
        isAccountPromoBannerVisible({
          cookies: '',
          dismissalCount: 'invalid',
          lastDismissed: null,
        }),
      ).toBe(true);
    });
  });

  describe('setAccountPromoBannerDismissed', () => {
    it('initialises the dismissal count and timestamp on first dismissal', () => {
      setAccountPromoBannerDismissed();

      expect(localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY)).toBe('1');
      expect(
        Number(localStorage.getItem(ACCOUNT_BANNER_LAST_DISMISS_KEY)),
      ).toBeGreaterThan(0);
    });

    it('increments the dismissal count on subsequent dismissals', () => {
      localStorage.setItem(ACCOUNT_BANNER_DISMISS_KEY, '2');
      setAccountPromoBannerDismissed();

      expect(localStorage.getItem(ACCOUNT_BANNER_DISMISS_KEY)).toBe('3');
    });

    describe('inline visibility script', () => {
      afterEach(() => {
        document.cookie = 'ckns_id=; Max-Age=0; path=/';
        document.documentElement.classList.remove(
          DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
        );
        jest.restoreAllMocks();
      });

      it.each([false, true])(
        'falls back to the signed-in cookie check when storage is blocked (signed in: %s)',
        signedIn => {
          const error = new Error('Storage access blocked');
          const storage = jest
            .spyOn(Storage.prototype, 'getItem')
            .mockImplementation(() => {
              throw error;
            });
          const consoleError = jest
            .spyOn(console, 'error')
            .mockImplementation();
          if (signedIn) document.cookie = 'ckns_id=token; path=/';

          runInNewContext(buildAccountBannerClientScript(), {
            window,
            document,
            console,
          });

          expect(
            document.documentElement.classList.contains(
              DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
            ),
          ).toBe(!signedIn);
          if (signedIn) {
            expect(storage).not.toHaveBeenCalled();
          } else {
            expect(consoleError).toHaveBeenCalledWith(
              'Unable to check account banner dismissal state',
              error,
            );
          }
        },
      );

      it('honours the dismissal cap when storage is available', () => {
        localStorage.setItem(
          ACCOUNT_BANNER_DISMISS_KEY,
          String(ACCOUNT_BANNER_MAX_DISMISSALS),
        );
        runInNewContext(buildAccountBannerClientScript(), {
          window,
          document,
          console,
        });
        expect(document.documentElement).not.toHaveClass(
          DISPLAY_ACCOUNT_PROMOTIONAL_BANNER_CSS_CLASS,
        );
      });
    });
  });
});
