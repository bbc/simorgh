/**
 * @pathname /arabic
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
  runPerformaceTests,
} from '../../common';

describe('Given I am on the Arabic AMP front page', () => {
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

describe('Given I am on the Arabic Canonical front page', () => {
  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'arabic' });
  });
});

describe('Given I am on a Arabic Frontpage AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'إذهب الى المحتوى',
    });
    runCanonicalUserTests();
    runFooterTests({
      copyrightText:
        '© 2020 بي بي سي. بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية. سياستنا بخصوص الروابط الخارجية.',
      brandingLink: '/arabic',
    });
  });

  // To be enabled when the radio schedule is rendered server side
  // describe('When I am looking for radio schedule component', () => {
  //   runComponentRenderTest();
  // });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'الرئيسية - BBC News عربي',
      canonicalUrl: 'http://localhost:7080/arabic',
      readingDirection: 'rtl',
      language: 'ar',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
      ogImageAlt: 'BBC News عربي',
      ogLocale: 'ar',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/arabic',
      ogSiteName: 'BBC News عربي',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCArabic',
      twitterImageAlt: 'BBC News عربي',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png',
      twitterSite: '@BBCArabic',
      ogDescription:
        'بي بي سي العربية هي شبكة لنقل الأخبار والمعلومات ومقاطع الفيديو إلى العالم عبر عدة وسائط، تشمل الإنترنت ومواقع التواصل الاجتماعي والراديو والتلفزيون والهواتف المحمولة.',
      ogTitle: 'الرئيسية - BBC News عربي',
      twitterDescription:
        'بي بي سي العربية هي شبكة لنقل الأخبار والمعلومات ومقاطع الفيديو إلى العالم عبر عدة وسائط، تشمل الإنترنت ومواقع التواصل الاجتماعي والراديو والتلفزيون والهواتف المحمولة.',
      twitterTitle: 'الرئيسية - BBC News عربي',
      linkedData:
        '{"@context":"http://schema.org","@type":"WebPage","url":"http://localhost:7080/arabic","publisher":{"@type":"NewsMediaOrganization","name":"BBC News عربي","publishingPrinciples":"https://www.bbc.com/arabic/institutional-49283069","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/arabic.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/arabic","name":"الرئيسية"}}',
    });

    describe('When optimising the application performance', () => {
      runPerformaceTests();
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'إذهب الى المحتوى',
    });
  });
});
