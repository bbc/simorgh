import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';
import { testsThatFollowSmokeTestConfigForAMPOnly } from './testsForAMPOnly';
import { testsThatFollowSmokeTestConfigForCanonicalOnly } from './testsForCanonicalOnly';

const testsForPage = {
  pageType: 'articles',
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
};

runTestsForPage(testsForPage);
