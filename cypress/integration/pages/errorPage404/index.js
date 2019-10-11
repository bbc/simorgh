import config from '../../../support/config/services';
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

//console.log(`${config[service].variant[varian].pageTypes[pageType]}`);

const testsForPage = {
  varian: 'lat',
  pageType: 'errorPage404',
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
