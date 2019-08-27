import runTestsForPage from '../../../support/helpers/runTestsForPage';
import {
  testsThatAlwaysRun,
  testsThatFollowSmokeTestConfig,
  testsThatNeverRunDuringSmokeTesting,
} from './tests';
import {
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTestingForAMPOnly,
} from './testsForAMPOnly';
import {
  testsThatAlwaysRunForCanonicalOnly,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
} from './testsForCanonicalOnly';

const testsForPage = {
  pageType: 'articles',
  testsThatAlwaysRun,
  testsThatFollowSmokeTestConfig,
  testsThatNeverRunDuringSmokeTesting,
  testsThatAlwaysRunForCanonicalOnly,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTestingForAMPOnly,
};

runTestsForPage(testsForPage);
