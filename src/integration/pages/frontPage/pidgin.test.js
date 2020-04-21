/**
 * @pathname /pidgin
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
    runCoreCanonicalTests({ service: 'pidgin' });
  });
});

describe('Given I am on a Pidgin Frontpage AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Waka go wetin de inside',
    });
    runCanonicalUserTests({ service: 'pidgin' });
    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 BBC. De external site no concern BBC. De way wey we de take go external link.',
      brandingLink: '/pidgin',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'Domot - BBC News Pidgin',
      canonicalUrl: 'http://localhost:7080/pidgin',
      readingDirection: 'ltr',
      language: 'pcm',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      ogImageAlt: 'BBC News Pidgin',
      ogLocale: 'pcm',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/pidgin',
      ogSiteName: 'BBC News Pidgin',
      twitterCard: 'summary_large_image',
      twitterCreator: '@BBCNews',
      twitterImageAlt: 'BBC News Pidgin',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png',
      twitterSite: '@BBCNews',
      ogDescription:
        'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
      ogTitle: 'Domot - BBC News Pidgin',
      twitterDescription:
        'We dey give una latest tori on top politics, environment, business, sports, entertainment, health, fashion and all di oda things wey dey happen for West and Central Africa come add di rest of di world join. For better informate plus explanation of all di ogbonge tori wey pipo never hear about for inside West and Central Africa, BBC Pidgin dey serve am with video, audio, maps and oda graphics join.',
      twitterTitle: 'Domot - BBC News Pidgin',
      linkedData:
        '{"@context":"http://schema.org","@type":"WebPage","url":"http://localhost:7080/pidgin","publisher":{"@type":"NewsMediaOrganization","name":"BBC News Pidgin","publishingPrinciples":"https://www.bbc.com/pidgin/institutional-48528766","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/pidgin.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/pidgin","name":"Domot"}}',
    });

    describe('When optimising the application performance', () => {
      runPerformanceTests();
    });

    describe('When I am using assistive technology', () => {
      runCommonA11yTests({
        skipToContentText: 'Waka go wetin de inside',
      });
    });

    describe('When I view the source code in the browser', () => {
      runSnapshotTests();
    });
  });
});
