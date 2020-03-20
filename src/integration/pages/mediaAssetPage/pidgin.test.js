/**
 * @pathname /pidgin/23248703
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import runUserTests from './user';

import {
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on a Pidgin AMP Media Asset Page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });
});

describe('Given I am on a Pidgin Canonical Media Asset Page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });
});

describe('Given I am on a Pidgin AMP/Canonical Media Asset Page', () => {
  describe('When I am using the website', () => {
    runUserTests({
      headlineText:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >',
      timestamp: '13 September 2019',
      bulletedListItemText:
        'sunt in culpa qui officia deserunt mollit anim id est laborum',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < > - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin/23248703',
      language: 'pcm',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText:
        'Simorgh: Media Pod Build First CPS Media Asset Page in Simorgh with the Help of Drew & < >',
    });
  });
});
