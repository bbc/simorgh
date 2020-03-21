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
      language: 'am',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
      headlineText: 'ያድምጡ',
    });
  });
});
