import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';
import {
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
} from './testsForAMPOnly';
import {
  testsThatAlwaysRunForCanonicalOnly,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
} from './testsForCanonicalOnly';

const testsForPage = {
  pageType: 'storyPage',
  testsThatAlwaysRunForCanonicalOnly,
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
};

runTestsForPage(testsForPage);
