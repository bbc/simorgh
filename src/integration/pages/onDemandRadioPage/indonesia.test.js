/**
 * @pathname /indonesia/bbc_indonesian_radio/w172x6r5000f38s
 */

import runCanonicalUserTests from './user.canonical';
import runAmpUserTests from './user.amp';
import runUserTests from './user';

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

describe('Given I am on an Indonesian AMP On Demand Radio Page', () => {
  describe.skip('When I am using the website', () => {
    runAmpUserTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/onDemandRadio',
    });
  });

  describe('When the application starts', () => {
    runCoreAmpTests({ service: 'indonesia' });
  });
});

describe('Given I am on an Indonesian Canonical On Demand Radio Page', () => {
  describe.skip('When I am using the website', () => {
    runCanonicalUserTests({
      audioEmbedUrl:
        'https://polling.test.bbc.co.uk/ws/av-embeds/onDemandRadio',
    });
  });

  describe.skip('When I am analysing user/performance metrics', () => {
    runCommonCanonicalAnalyticsTests();
  });

  describe('When the application starts', () => {
    runCoreCanonicalTests({ service: 'indonesia' });
  });
});

describe('Given I am on an Indonesian On Demand Radio Page', () => {
  describe('When I am using the website', () => {
    runHeaderTests({
      skipToContentText: 'Langsung ke konten',
    });

    runUserTests({
      brandTitle: 'Dunia Pagi Ini',
      episodeTitle: '05/03/2020 GMT',
      episodeSummary:
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
    });

    runFooterTests({
      copyrightText:
        '© 2020 BBC. BBC tidak bertanggung jawab atas konten dari situs eksternal. Baca tentang peraturan baru terkait link eksternal.',
      brandingLink: '/indonesia',
    });
  });

  describe.skip('When a search engine is crawling the website', () => {
    runCommonSeoTests({
      pageTitle: 'Dunia Pagi Ini - BBC News Indonesia',
      canonicalUrl:
        'http://localhost:7080/indonesia/bbc_indonesian_radio/w172x6r5000f38s',
      readingDirection: 'ltr',
      language: 'id',
      fbAdmins: '100004154058350',
      fbAppId: '1609039196070050',
      ogImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/indonesia.png',
      ogImageAlt: 'BBC News Indonesia',
      ogLocale: 'id-ID',
      ogType: 'website',
      ogUrl:
        'http://localhost:7080/indonesia/bbc_indonesian_radio/w172x6r5000f38s',
      ogSiteName: 'BBC News Indonesia',
      ogDescription:
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
      ogTitle: 'Dunia Pagi Ini - BBC News Indonesia',
      twitterCard: 'summary_large_image',
      twitterCreator: '@bbcindonesia',
      twitterImageAlt: 'BBC News Indonesia',
      twitterImageSrc:
        'https://news.files.bbci.co.uk/ws/img/logos/og/indonesia.png',
      twitterSite: '@bbcindonesia',
      twitterDescription:
        'Berita terbaru dari seluruh dunia dan ulasan peristiwa dari Indonesia. Juga berita olahraga terbaru dan berbeda setiap harinya.',
      twitterTitle: 'Dunia Pagi Ini - BBC News Indonesia',
      linkedData: 'Not Implemented Yet',
    });
  });

  describe('When optimising the application performance', () => {
    runPerformanceTests();
  });

  describe('When I am using assistive technology', () => {
    runCommonA11yTests({
      skipToContentText: 'Langsung ke konten',
      headlineText: 'Dunia Pagi Ini',
    });
  });

  describe('When I view the source code in the browser', () => {
    runSnapshotTests();
  });
});
