/**
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runUserTests from './user';
import runUserAmpTests from './user.amp';
import runUserCanonicalTests from './user.canonical';
import {
  runFooterTests,
  runHeaderTests,
  runCommonSeoTests,
  runCommonA11yTests,
  runCoreAmpTests,
  runCoreCanonicalTests,
  runPerformanceTests,
  runCommonAmpAnalyticsTests,
  runCommonCanonicalAnalyticsTests,
  runSnapshotTests,
} from '../../common';

describe('Given I am on the Korean live radio AMP page', () => {
  describe('When I am using the website', () => {
    runUserAmpTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko/amp',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });
});

describe('Given I am on the Korean live radio Canonical page', () => {
  describe('When I am using the website', () => {
    runUserCanonicalTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'korean' });
  });
});

describe('Given I am on the Korean live radio page AMP/Canonical', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: '내용으로 건너뛰기',
    });

    runUserTests({
      headlineText: 'BBC 코리아 라디오',
      summaryText: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. BBC는 외부 인터넷 사이트 및 콘텐츠에 대한 책임을 지지않습니다. 외부 콘텐츠 링크에 대한 본사 정책 보기.',
      brandingLink: '/korean',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'BBC 코리아 라디오 - BBC News 코리아',
      canonicalUrl: 'http://localhost:7080/korean/bbc_korean_radio/liveradio',
      readingDirection: 'ltr',
      language: 'ko',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
      ogImageAlt: 'BBC News 코리아',
      ogLocale: 'ko-KO',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/korean/bbc_korean_radio/liveradio',
      ogSiteName: 'BBC News 코리아',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcnews',
      twitterImageAlt: 'BBC News 코리아',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/korean.png',
      twitterSite: '@bbcnews',
      ogDescription: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
      ogTitle: 'BBC 코리아 라디오 - BBC News 코리아',
      twitterDescription:
        '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
      twitterTitle: 'BBC 코리아 라디오 - BBC News 코리아',
      linkedData:
        '{"@context":"http://schema.org","@type":"RadioChannel","url":"http://localhost:7080/korean/bbc_korean_radio/liveradio","publisher":{"@type":"NewsMediaOrganization","name":"BBC News 코리아","publishingPrinciples":"https://www.bbc.com/korean/institutional-49283197","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/korean.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/korean.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/korean.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/korean/bbc_korean_radio/liveradio","name":"BBC 코리아 라디오"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: '내용으로 건너뛰기',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
