import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { fontsAreCached } from './assertions';

const tests = [fontsAreCached];

const testSuites = [
  {
    path: '/amharic',
    runforEnv: ['local', 'test', 'live'],
    service: 'amharic',
    expectedFonts: ['Noto_Sans_Ethiopic_Bold', 'Noto_Sans_Ethiopic'],
    tests,
  },
  {
    path: '/arabic',
    runforEnv: ['local', 'test', 'live'],
    service: 'arabic',
    expectedFonts: ['BBCReithQalam_W_Bd', 'BBCReithQalam_W_Rg'],
    tests,
  },
  {
    path: '/bengali',
    runforEnv: ['local', 'test', 'live'],
    service: 'bengali',
    expectedFonts: ['Noto_Serif_Bengali_Bold', 'Noto_Serif_Bengali'],
    tests,
  },
  {
    path: '/burmese',
    runforEnv: ['local', 'test', 'live'],
    service: 'burmese',
    expectedFonts: ['Padauk_Bold', 'Padauk'],
    tests,
  },
  {
    path: '/gujarati',
    runforEnv: ['local', 'test', 'live'],
    service: 'gujarati',
    expectedFonts: ['Noto_Sans_Gujarati_Bold', 'Noto_Sans_Gujarati'],
    tests,
  },
  {
    path: '/tamil',
    runforEnv: ['local', 'test', 'live'],
    service: 'tamil',
    expectedFonts: ['Noto_Sans_Tamil_Bold', 'Noto_Sans_Tamil'],
    tests,
  },
  {
    path: '/telugu',
    runforEnv: ['local', 'test', 'live'],
    service: 'telugu',
    expectedFonts: ['Noto_Sans_Telugu_Bold', 'Noto_Sans_Telugu'],
    tests,
  },
  {
    path: '/sinhala',
    runforEnv: ['local', 'test', 'live'],
    service: 'sinhala',
    expectedFonts: ['Noto_Serif_Sinhala_Bold', 'Noto_Serif_Sinhala'],
    tests,
  },
  {
    path: '/mundo',
    runforEnv: ['local', 'test', 'live'],
    service: 'mundo',
    expectedFonts: [
      'BBCReithSans_W_Bd',
      'BBCReithSans_W_Rg',
      'BBCReithSerif_WNumbers_Lt',
      'BBCReithSerif_W_Md',
    ],
    tests,
  },
  /**
   * Services without fonts
   */
  {
    path: '/pidgin',
    runforEnv: ['local', 'test', 'live'],
    service: 'pidgin',
    expectedFonts: [],
    tests,
  },
  {
    path: '/serbian/cyr',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    variant: 'cyr',
    expectedFonts: [],
    tests,
  },
  {
    path: '/serbian/lat',
    runforEnv: ['local', 'test', 'live'],
    service: 'serbian',
    variant: 'lat',
    expectedFonts: [],
    tests,
  },
];

runTestsForPage({
  pageType: HOME_PAGE,
  testSuites,
});
