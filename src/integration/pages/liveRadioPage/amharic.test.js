/**
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runUserTests from './user';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on the Amharic live radio amp page', () => {});

describe('Given I am on the Amharic live radio canonical page', () => {});

describe('Given I am on the Amharic live radio amp/canonical page', () => {
  describe('When I am using the website', () => {
    runUserTests({
      headlineText: 'ያድምጡ',
      summaryText: 'ዝግጅቶቻችንን’',
    });

    runHeaderTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም. ስለ ውጪ ሊንኮች ያለን አቀራረብ',
      brandingLink: '/amharic',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'ያድምጡ - BBC News አማርኛ',
      canonicalUrl: 'http://localhost:7080/amharic/bbc_amharic_radio/liveradio',
      readingDirection: 'ltr',
      language: 'am',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
      ogImageAlt: 'BBC News አማርኛ',
      ogLocale: 'am-ET',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/amharic/bbc_amharic_radio/liveradio',
      ogSiteName: 'BBC News አማርኛ',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcnews',
      twitterImageAlt: 'BBC News አማርኛ',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
      twitterSite: '@bbcnews',
      ogDescription: 'ዝግጅቶቻችንን’',
      ogTitle: 'ያድምጡ - BBC News አማርኛ',
      twitterDescription: 'ዝግጅቶቻችንን’',
      twitterTitle: 'ያድምጡ - BBC News አማርኛ',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
      headlineText: 'ያድምጡ',
    });
  });
});
