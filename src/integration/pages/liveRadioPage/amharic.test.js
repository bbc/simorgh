/**
 * @pathname /amharic/bbc_amharic_radio/liveradio
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
} from '../../common';

describe('Given I am on the Amharic live radio AMP page', () => {
  describe('When I am using the website', () => {
    runUserAmpTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am/amp',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests();
  });
});

describe('Given I am on the Amharic live radio Canonical page', () => {
  describe('When I am using the website', () => {
    runUserCanonicalTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/media/bbc_amharic_radio/liveradio/am',
    });
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'amharic' });
  });
});

describe('Given I am on the Amharic live radio AMP/Canonical page', () => {
  describe('When I am using the website', () => {
    runUserTests({
      headlineText: 'ያድምጡ',
      summaryText: 'ዝግጅቶቻችንን’',
    });

    runHeaderTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
    });

    runFooterTests({
      copyrightText:
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

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'ወደ ዋናው ይዘት ይለፉ',
      headlineText: 'ያድምጡ',
    });
  });
});
