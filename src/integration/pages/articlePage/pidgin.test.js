/**
 * @pathname /pidgin/tori-51745682
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
} from '../../common';

describe('Given I am on a Pidgin article amp page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });
});

describe('Given I am on a Pidgin article canonical page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      imageAltText: 'Comrade Adams Oshiomole',
      imageCaptionText:
        'APC Chairman Adams Oshiomhole don be Govnor of Edo State before',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });
});

describe('Given I am on a Pidgin article amp/canonical page', () => {
  describe('When I am using the website', () => {
    runFooterTests({
      copyrightText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
      canonicalUrl: 'http://localhost:7080/pidgin/tori-51745682',
      language: 'pcm',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText: "Adams Oshiomhole say 'I still be APC National Chairman'",
    });
  });
});
