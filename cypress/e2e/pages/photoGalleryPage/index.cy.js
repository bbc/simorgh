import runTestsForPage from '../../../support/helpers/runTestsForPage';
import { testsThatFollowSmokeTestConfig } from './tests';

const testsForPage = {
  pageType: 'photoGalleryPage',
  testsThatFollowSmokeTestConfig,
};

runTestsForPage(testsForPage);
