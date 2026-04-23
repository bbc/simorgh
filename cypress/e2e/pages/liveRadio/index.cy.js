import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import e2eTests from './tests';
import testsForAllPages from '../testsForAllPages';
import testsForAllCanonicalPages from '../testsForAllCanonicalPages';

const pageType = 'liveRadio';

const tests = [e2eTests, testsForAllPages, testsForAllCanonicalPages];

const testSuites = [
  {
    path: '/afaanoromoo/bbc_afaanoromoo_radio/liveradio',
    service: 'afaanoromoo',
    runforEnv: ['local'],
    tests,
  },
];

runTestsForPage({
  pageType,
  testSuites,
});
