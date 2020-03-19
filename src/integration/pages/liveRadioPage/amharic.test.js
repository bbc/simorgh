/**
 * @pathname /amharic/bbc_amharic_radio/liveradio
 */

import runUserTests from './user';
import {
  runFooterTests,
  runCommonSeoTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on the Amharic live radio page', () => {
  describe('When I am on amp/canonical', () => {
    describe('When I am a user', () => {
      runUserTests({
        headlineText: 'ያድምጡ',
        summaryText: 'ዝግጅቶቻችንን’',
      });

      runFooterTests({
        copyrightText:
          '© 2020 BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም. ስለ ውጪ ሊንኮች ያለን አቀራረብ',
        brandingLink: '/amharic',
      });
    });

    describe('When I am a search engine', () => {
      runCommonSeoTests({
        pageTitle: 'ያድምጡ - BBC News አማርኛ',
        canonicalUrl:
          'http://localhost:7080/amharic/bbc_amharic_radio/liveradio',
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

  describe('When I am on amp', () => {});
  describe('When I am on canonical', () => {});
});
