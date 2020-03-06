import { runFooterTests, runCommonSeoTests } from '../../common';
import { ARTICLE_PAGE_URL } from '../../pageUrls';

runCommonSeoTests({
  pageUrl: ARTICLE_PAGE_URL,
  pageTitle:
    "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
});

runFooterTests({
  pageUrl: ARTICLE_PAGE_URL,
  copyrightText:
    '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
  brandingText: 'BBC News, Pidgin',
  brandingLink: '/pidgin',
});
