/**
 * @pathname /persian/iran-23231114
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import runUserTests from './user';
import runCanonicalA11yTests from './a11y.canonical';
import runAmpA11yTests from './a11y.amp';

import {
  runHeaderTests,
  runFooterTests,
  runCommonSeoTests,
  runCommonCanonicalAnalyticsTests,
  runCoreCanonicalTests,
  runCoreAmpTests,
  runCommonA11yTests,
  runPerformanceTests,
  runSnapshotTests,
} from '../../common';

describe('Given I am on a Persian AMP Media Asset Page', () => {
  describe('When I am using the website', () => {
    runAmpUserTests({
      imageUrl: 'https://ichef.test.bbci.co.uk/images/ic/1024x576/p01lmkk5.jpg',
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/cps/persian/iran-23231114/p01lmkjk/fa/amp',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests({ service: 'persian' });
  });

  describe('When I am using assistive technology', () => {
    runAmpA11yTests({
      mediaPlayerTitle: 'Media player',
    });
  });
});

describe('Given I am on a Persian Canonical Media Asset Page', () => {
  describe('When I am using the website', () => {
    runCanonicalUserTests({
      mediaEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/cps/persian/iran-23231114/p01lmkjk/fa',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'persian' });
  });

  describe('When I am using assistive technology', () => {
    runCanonicalA11yTests({
      mediaPlayerTitle: 'Media player',
    });
  });
});

describe('Given I am on a Persian Media Asset Page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'مشاهده محتوا',
    });

    runUserTests({
      headlineText: 'Trump long headline',
      timestamp: '۲۶ بهمن ۱۳۹۷ - ۱۵ فوریه ۲۰۱۹',
    });

    runFooterTests({
      copyrightText:
        '© 2020 بی بی سی. بی بی سی مسئول محتوای سایت های دیگر نیست. سیاست ما درباره لینک دادن به سایت های دیگر.',
      brandingLink: '/persian',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'Trump long headline - BBC News فارسی',
      canonicalUrl: 'http://localhost:7080/persian/iran-23231114',
      readingDirection: 'rtl',
      language: 'fa',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage:
        'http://ichef.test.bbci.co.uk/news/1024/branded_persian/14DFC/test/_63700558_p01lmkk5.jpg',
      ogImageAlt: 'Trump getting upset',
      ogLocale: 'fa',
      ogType: 'article',
      ogUrl: 'http://localhost:7080/persian/iran-23231114',
      ogSiteName: 'BBC News فارسی',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcpersian',
      twitterImageAlt: 'Trump getting upset',
      twitterImageSrc:
        'http://ichef.test.bbci.co.uk/news/1024/branded_persian/14DFC/test/_63700558_p01lmkk5.jpg',
      twitterSite: '@bbcpersian',
      ogDescription: 'Trump summary text',
      ogTitle: 'Trump long headline - BBC News فارسی',
      twitterDescription: 'Trump summary text',
      twitterTitle: 'Trump long headline - BBC News فارسی',
      linkedData:
        '{"@context":"http://schema.org","@type":"Article","url":"http://localhost:7080/persian/iran-23231114","publisher":{"@type":"NewsMediaOrganization","name":"BBC News فارسی","publishingPrinciples":"https://www.bbc.com/persian/institutional-49283091","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/persian/iran-23231114","name":"Trump long headline"},"headline":"Trump long headline","datePublished":"2019-02-15T12:47:51.000Z","dateModified":"2019-02-15T12:47:54.000Z","author":{"@type":"NewsMediaOrganization","name":"BBC News فارسی","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/persian.png"},"noBylinesPolicy":"https://www.bbc.com/persian/institutional-49283091#authorexpertise"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'مشاهده محتوا',
      headlineText: 'Trump long headline',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
