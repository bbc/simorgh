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
  runPerformanceTests,
  runSnapshotTests,
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
    runCanonicalUserTests({ service: 'arabic' });
    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 بي بي سي. بي بي سي ليست مسؤولة عن محتوى المواقع الخارجية. سياستنا بخصوص الروابط الخارجية.',
      brandingLink: '/arabic',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'الرئيسية - BBC News عربي',
      canonicalUrl: 'http://localhost:7080/arabic',
      readingDirection: 'rtl',
      language: 'ar',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
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
      runPerformanceTests();
    });
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'إذهب الى المحتوى',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
