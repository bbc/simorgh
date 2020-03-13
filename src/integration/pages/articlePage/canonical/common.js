import {
  runCommonAnalyticsTests,
  runFooterTests,
  runCommonSeoTests,
} from '../../../common/canonical';
import { ARTICLE_PAGE_URL } from '../../../pageUrls';

export default () => {
  describe('Common', () => {
    runCommonAnalyticsTests({
      pageUrl: ARTICLE_PAGE_URL,
    });

    runCommonSeoTests({
      pageUrl: ARTICLE_PAGE_URL,
      pageTitle:
        'This is the SEO headline of this test article - BBC News Pidgin',
      canonicalUrl: 'http://localhost/pidgin/articles/cgwk9w4zlg8o',
      language: 'pcm',
    });

    runFooterTests({
      pageUrl: ARTICLE_PAGE_URL,
      copyrightText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingText: 'BBC News, Pidgin',
      brandingLink: '/pidgin',
    });
  });
};
