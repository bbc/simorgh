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
  pageType: 'mediaArticlePage',
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


// import config from '../../../support/config/services';
// import getPaths from '../../../support/helpers/getPaths';
// import serviceHasPageType from '../../../support/helpers/serviceHasPageType';

// // import crossPlatformTests from './tests';
// import visitPage from '../../../support/helpers/visitPage';
// // import { getTopicPagePath } from './helpers';

// const pageType = 'topicPage';
// Object.keys(config)
//     .filter(service => serviceHasPageType(service, pageType))
//     .forEach(serviceId => {
//         const { variant, name: service } = config[serviceId];

//         const paths = getPaths(serviceId, pageType);
//         paths.forEach(currentPath => {
//             describe(`${pageType} - ${currentPath}`, () => {
//                 before(() => {
//                     Cypress.env('currentPath', currentPath);
//                     visitPage(getTopicPagePath(currentPath), pageType);
//                 });
//                 crossPlatformTests({
//                     service,
//                     pageType,
//                 });
//             });
//         });
//     });