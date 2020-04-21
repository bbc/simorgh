/**
 * @pathname /korean/bbc_korean_radio/liveradio
 */

import runUserTests from './user';
import runUserAmpTests from './user.amp';
import runUserCanonicalTests from './user.canonical';
import runCanonicalA11yTests from './a11y.canonical';
import runAmpA11yTests from './a11y.amp';

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

describe('Given I am on the Korean AMP Live Radio page', () => {
  describe('When I am using the website', () => {
    runUserAmpTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko/amp?morph_env=live',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonAmpAnalyticsTests();
  });

  describe('When I am using assistive technology', () => {
    runAmpA11yTests({
      mediaPlayerTitle: '오디오 플레이어',
    });
  });
});

describe('Given I am on the Korean Canonical Live Radio page', () => {
  describe('When I am using the website', () => {
    runUserCanonicalTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_korean_radio/liveradio/ko?morph_env=live',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'korean' });
  });

  describe('When I am using assistive technology', () => {
    runCanonicalA11yTests({
      mediaPlayerTitle: '오디오 플레이어',
    });
  });
});

describe('Given I am on the Korean Live Radio page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: '내용 보기',
    });

    runUserTests({
      headlineText: 'BBC 코리아 라디오',
      summaryText: '세계와 한반도 뉴스를 공정하고 객관적으로 전달해 드립니다',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 BBC. BBC는 외부 사이트 및 타사 콘텐츠에 대한 책임을 지지 않습니다 외부 링크에 대한 본사 정책 보기',
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
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
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
      skipToContentText: '내용 보기',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
