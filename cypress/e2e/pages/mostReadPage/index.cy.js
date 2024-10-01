import config from '../../../support/config/services';
import envs from '../../../support/config/envs';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import getAppEnv from '../../../support/helpers/getAppEnv';

const pageType = 'mostReadPage';

/**
 * Use a selection of services to ensure Most Read page renders as expected
 * arabic: RTL service
 * igbo: small service, only 5 items displayed
 * pidgin: LTR service
 * serbian: service with variant
 */
const services = ['arabic', 'igbo', 'pidgin', 'serbian'];

Object.values(config).forEach(
  ({ name: service, variant, pageTypes, isWorldService }) => {
    if (isWorldService && services.includes(service)) {
      const { mostReadPage } = pageTypes;

      const urls =
        mostReadPage.environments &&
        mostReadPage.environments[getAppEnv()]?.paths;

      urls?.forEach(currentPath => {
        describe(`${pageType} - ${envs.baseUrl}${currentPath}`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(currentPath, pageType);
          });
          crossPlatformTests({
            service,
            pageType,
            variant,
          });
          testsForCanonicalOnly({
            service,
            pageType,
            variant,
          });
        });
      });

      urls
        ?.map(path => `${path}.amp`)
        .forEach(currentPath => {
          describe(`${pageType} - ${envs.baseUrl}${currentPath}`, () => {
            before(() => {
              Cypress.env('currentPath', currentPath);
              visitPage(currentPath, pageType);
            });
            crossPlatformTests({
              service,
              pageType,
              variant,
              isAmp: true,
            });
          });
        });
    }
  },
);
