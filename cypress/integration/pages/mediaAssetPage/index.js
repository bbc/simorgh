import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';

const testsForPage = {
  pageType: 'mediaAssetPage',
  testsThatFollowSmokeTestConfig,
};
runTestsForPage(testsForPage);
