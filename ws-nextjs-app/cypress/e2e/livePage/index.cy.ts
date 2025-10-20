import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import mediaPlayerTests from './mediaPlayer';
import pageVisit from './pageVisit';
import keyPoints from './keyPoints';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import runTestsForPage from '../../support/helpers/runTestsForPage';

const testDetails = {
  pageType: LIVE_PAGE,
  testSuites: [
    {
      path: '/pidgin/live/c7p765ynk9qt',
      id: 'c7p765ynk9qt',
      runforEnv: ['test', 'local'],
      service: 'pidgin',
      tests: [
        testsThatAlwaysRunForAllPages,
        pageVisit,
        mediaPlayerTests,
        keyPoints,
      ],
    },
    {
      path: '/urdu/live/cx2qdkezzzvt',
      id: 'cx2qdkezzzvt',
      runforEnv: ['live'],
      service: 'urdu',
      tests: [testsThatAlwaysRunForAllPages, pageVisit, keyPoints],
    },
  ],
};

describe('Live Page Spec', () => {
  runTestsForPage(testDetails);
});
