import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfigForAMPOnly } from './testsForAMPOnly';
import { testsThatFollowSmokeTestConfigForCanonicalOnly } from './testsForCanonicalOnly';

const testsForPage = {
  pageType: 'featureIndexPage',
  testsThatFollowSmokeTestConfigForCanonicalOnly,
  testsThatFollowSmokeTestConfigForAMPOnly,
};

runTestsForPage(testsForPage);
