import {
  runCommonAnalyticsTests,
  runFooterTests,
  runCommonSeoTests,
} from '../../common';
import { ARTICLE_PAGE_URL } from '../../pageUrls';

runCommonAnalyticsTests({
  pageUrl: ARTICLE_PAGE_URL,
});

runCommonSeoTests({
  pageUrl: ARTICLE_PAGE_URL,
  pageTitle:
    "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
  canonicalUrl: 'http://localhost/pidgin/tori-51745682',
  language: 'pcm',
});

runFooterTests({
  pageUrl: ARTICLE_PAGE_URL,
  copyrightText:
    '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
  brandingText: 'BBC News, Pidgin',
  brandingLink: '/pidgin',
});
