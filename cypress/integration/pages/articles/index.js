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

import urls from './urls';

const testsForPage = {
  pageType: 'articles',
  urls,
  testsThatAlwaysRun,
  testsThatAlwaysRunForCanonicalOnly,
  testsThatAlwaysRunForAMPOnly,
  testsThatFollowSmokeTestConfig,
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
  testsThatNeverRunDuringSmokeTesting,
  testsThatNeverRunDuringSmokeTestingForCanonicalOnly,
  testsThatNeverRunDuringSmokeTestingForAMPOnly,
};

runTestsForPage(testsForPage);
