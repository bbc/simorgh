import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testDetails = {
  pageType: 'live',
  testSuites: [
    {
      path: '/pidgin/live/c7p765ynk9qt',
      id: 'c7p765ynk9qt',
      runforEnv: ['test', 'local'],
      service: 'pidgin',
      tests: [testsThatAlwaysRunForAllPages, pageVisit, mediaPlayerTests],
    },
  ],
};

describe('Live Page Spec', () => {
  runTestsForPage(testDetails);
});
