import {
  MEDIA_ARTICLE_PAGE,
  TV_PAGE,
  LIVE_TV_PAGE,
  TOPIC_PAGE,
  STORY_PAGE,
  ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import isDarkUIPage from '.';

describe('isDarkUIPage', () => {
  describe('dark UI pages', () => {
    it.each([MEDIA_ARTICLE_PAGE, TV_PAGE, LIVE_TV_PAGE])(
      'returns true for %s',
      pageType => {
        expect(isDarkUIPage({ pageType })).toBe(true);
      },
    );

    it('returns true for TOPIC_PAGE with primaryMediaType video', () => {
      expect(
        isDarkUIPage({ pageType: TOPIC_PAGE, primaryMediaType: 'video' }),
      ).toBe(true);
    });
  });

  describe('non-dark UI pages', () => {
    it.each([STORY_PAGE, ARTICLE_PAGE])('returns false for %s', pageType => {
      expect(isDarkUIPage({ pageType })).toBe(false);
    });
  });
});
