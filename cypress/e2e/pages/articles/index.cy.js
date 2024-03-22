import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatAlwaysRun, testsThatFollowSmokeTestConfig } from './tests';
import { testsThatFollowSmokeTestConfigForAMPOnly } from './testsForAMPOnly';
import { testsThatFollowSmokeTestConfigForCanonicalOnly } from './testsForCanonicalOnly';

const testsForPage = {
  pageType: 'articles',
  testsThatAlwaysRun,
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
};

runTestsForPage(testsForPage);
