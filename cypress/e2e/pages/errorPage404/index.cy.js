import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';

const testsForPage = {
  pageType: 'errorPage404',
  testsThatFollowSmokeTestConfig,
};

runTestsForPage(testsForPage);
