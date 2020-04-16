/**
 * @pathname /amharic/bbc_amharic_radio/liveradio
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

describe('Given I am on the Amharic AMP Live Radio page', () => {
  describe('When I am using the website', () => {
    runUserAmpTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am/amp',
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
      mediaPlayerTitle: 'Audio player',
    });
  });
});

describe('Given I am on the Amharic Canonical Live Radio page', () => {
  describe('When I am using the website', () => {
    runUserCanonicalTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am',
    });
  });

  describe('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'amharic' });
  });

  describe('When I am using assistive technology', () => {
    runCanonicalA11yTests({
      mediaPlayerTitle: 'Audio player',
    });
  });
});

describe('Given I am on the Amharic Live Radio page', () => {
  describe('When I am using the website', () => {
    runUserTests({
      headlineText: 'ያድምጡ',
      summaryText: 'ዝግጅቶቻችንን’',
    });

    runHeaderTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
    });

    runFooterTests({
      copyrightAndExternalLinkingText:
        '© 2020 BBC. ቢቢሲ ከሌሎች ድረ-ገጾች ለሚመጡ መረጃዎች ሀላፊነት አይወስድም. ስለ ውጪ ሊንኮች ያለን አቀራረብ',
      brandingLink: '/amharic',
    });
  });

  describe('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'ያድምጡ - BBC News አማርኛ',
      canonicalUrl: 'http://localhost:7080/amharic/bbc_amharic_radio/liveradio',
      readingDirection: 'ltr',
      language: 'am',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      fbPages:
        '285361880228,192168680794107,9432520138,347501767628,264572343581678,303522857815,166580710064489,592266607456680,260669183761,160817274042538,236659822607,237647452933504,10150118096995434,113097918700687,143048895744759,81395234664,207150596007088,167959249906191,64040652712,190992343324,103678496456574,367167334474,160894643929209,186742265162,1526071940947174,230299653821,124158667615790,126548377386804,298318986864908,1068750829805728,228458913833525,163571453661989,660673490805047,948946275170651,485274381864409,1633841096923106,654070648098812',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
      ogImageAlt: 'BBC News አማርኛ',
      ogLocale: 'am-ET',
      ogType: 'website',
      ogUrl: 'http://localhost:7080/amharic/bbc_amharic_radio/liveradio',
      ogSiteName: 'BBC News አማርኛ',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcnews',
      twitterImageAlt: 'BBC News አማርኛ',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png',
      twitterSite: '@bbcnews',
      ogDescription: 'ዝግጅቶቻችንን’',
      ogTitle: 'ያድምጡ - BBC News አማርኛ',
      twitterDescription: 'ዝግጅቶቻችንን’',
      twitterTitle: 'ያድምጡ - BBC News አማርኛ',
      linkedData:
        '{"@context":"http://schema.org","@type":"RadioChannel","url":"http://localhost:7080/amharic/bbc_amharic_radio/liveradio","publisher":{"@type":"NewsMediaOrganization","name":"BBC News አማርኛ","publishingPrinciples":"https://www.bbc.com/amharic/institutional-49283133","logo":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png"}},"image":{"@type":"ImageObject","width":1024,"height":576,"url":"https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png"},"thumbnailUrl":"https://news.files.bbci.co.uk/ws/img/logos/og/amharic.png","mainEntityOfPage":{"@type":"WebPage","@id":"http://localhost:7080/amharic/bbc_amharic_radio/liveradio","name":"ያድምጡ"}}',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
