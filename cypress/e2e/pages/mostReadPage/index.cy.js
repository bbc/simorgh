import config from '../../../support/config/services';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import getAppEnv from '../../../support/helpers/getAppEnv';

const pageType = 'mostReadPage';

Object.values(config).forEach(
  ({ name: service, variant, pageTypes, isWorldService }) => {
    if (isWorldService) {
      const { mostReadPage } = pageTypes;

      const urls =
        mostReadPage.environments &&
        mostReadPage.environments[getAppEnv()]?.paths;

      urls?.forEach(currentPath => {
        describe(`${pageType} - ${currentPath}`, () => {
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
          describe(`${pageType} - ${currentPath}`, () => {
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
