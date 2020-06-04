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
  pageType: 'mostReadPage',
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

Object.keys(services)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(service => {
    const [path] = getPaths(service, pageType);
    const { variant } = services[service];

    const testArgs = { service, pageType, variant };

    describe(`${service} - ${pageType}`, () => {
      beforeEach(() => {
        getCurrentPath(path);
      });

      describe(`${Cypress.env('currentPath')} - Canonical`, () => {
        beforeEach(() => {
          visitPage(Cypress.env('currentPath'), pageType);
        });

        runCrossPlatformTests(testArgs);
        runCanonicalTests(testArgs);
      });

      describe(`${Cypress.env('currentPath')} - AMP`, () => {
        beforeEach(() => {
          visitPage(`${Cypress.env('currentPath')}.amp`, pageType);
        });

        runCrossPlatformTests(testArgs);
        runAmpTests(testArgs);
      });
    });
  });
