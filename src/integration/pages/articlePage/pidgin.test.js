/**
 * @pathname /pidgin/tori-51745682
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
} from '../../common';

describe('Given I am on a Pidgin article amp page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  runCoreAmpTests();
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
    runHeaderTests({
      skipToContentText: 'Waka go wetin de inside',
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
        "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
      canonicalUrl: 'http://localhost:7080/pidgin/tori-51745682',
      readingDirection: 'ltr',
      language: 'pcm',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/747F/production/_111132892_4dfb65ac-5870-417e-8e26-4c234e4b1c19.jpg',
      ogImageAlt: 'Adams Oshiomole',
      ogLocale: 'pcm',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/pidgin/tori-51745682',
      ogSiteName: 'BBC News Pidgin',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCNews',
      twitterImageAlt: 'Adams Oshiomole',
      twitterImageSrc:
        'http://ichef.test.bbci.co.uk/news/1024/branded_pidgin/747F/production/_111132892_4dfb65ac-5870-417e-8e26-4c234e4b1c19.jpg',
      twitterSite: '@BBCNews',
      ogDescription: 'Oga Oshiomhole don cari di mata go Court of Appeal.',
      ogTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
      twitterDescription: 'Oga Oshiomhole don cari di mata go Court of Appeal.',
      twitterTitle:
        "Adams Oshiomhole say 'I still be APC National Chairman' - BBC News Pidgin",
      linkedData:
        '{"@context":"http://schema.org","@type":"ReportageNewsArticle","url":"http://localhost:7080/pidgin/tori-51745682","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","publishingPrinciples":"https://www.bbc.com/pidgin/institutional-48528766","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/pidgin/tori-51745682","name":"Adams Oshiomhole say \'I still be APC National Chairman\'"},"headline":"Adams Oshiomhole say \'I still be APC National Chairman\'","description":"Oga Oshiomhole don cari di mata go Court of Appeal.","datePublished":"2020-03-04T18:58:43.000Z","dateModified":"2020-03-04T19:27:57.000Z","about":[{"@type":"Thing","name":"Nigeria"},{"@type":"Thing","name":"Nigeria politics","sameAs":["http://dbpedia.org/resource/Politics_of_Nigeria"]}],"author":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"noBylinesPolicy":"https://www.bbc.com/pidgin/institutional-48528766#authorexpertise"}}',
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText: "Adams Oshiomhole say 'I still be APC National Chairman'",
    });
  });
});
