/**
 * @pathname /pidgin/articles/cwl08rd38l6o
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCommonAmpAnalyticsTests,
  runCommonA11yTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runPerformanceTests,
} from '../../common';

describe('Given I am on a Pidgin AMP Article page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests();
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });
});

describe('Given I am on a Pidgin Canonical Article page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      imageAltText: 'Map of France showing Paris and Cognac',
      imageCaptionText:
        'This test image, copyright BBC, shows a map of France. The image is in the first three blocks and has this caption.',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'pidgin' });
  });
});

describe('Given I am on a Pidgin Article page', () => {
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
        'This is the SEO headline of this test article - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin/articles/cwl08rd38l6o',
      readingDirection: 'ltr',
      language: 'pcm',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      ogImageAlt: 'BBC News Pidgin',
      ogLocale: 'pcm',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/pidgin/articles/cwl08rd38l6o',
      ogSiteName: 'BBC News Pidgin',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCNews',
      twitterImageAlt: 'BBC News Pidgin',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      twitterSite: '@BBCNews',
      ogDescription: 'This is the SEO headline of this test article',
      ogTitle:
        'This is the SEO headline of this test article - BBC News Pidgin',
      twitterDescription: 'This is the SEO headline of this test article',
      twitterTitle:
        'This is the SEO headline of this test article - BBC News Pidgin',
      linkedData:
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/pidgin/articles/cwl08rd38l6o","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","publishingPrinciples":"https://www.bbc.com/pidgin/institutional-48528766","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/pidgin/articles/cwl08rd38l6o","name":"This is the SEO headline of this test article"},"headline":"This is the SEO headline of this test article","datePublished":"2019-07-12T13:00:04.940Z","dateModified":"2019-09-27T15:56:33.775Z","author":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"noBylinesPolicy":"https://www.bbc.com/pidgin/institutional-48528766#authorexpertise"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Waka go wetin de inside',
      headlineText: 'This is the headline of this test article',
    });
  });
});
