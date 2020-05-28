import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import testsForAMPOnly from './testsForAMPOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';

const pageType = 'onDemandRadio';
Object.keys(config).forEach(service => {
  const { variant } = config[service];
  Object.keys(config[service].pageTypes)
    .filter(() => serviceHasPageType(service, pageType))
    .forEach(() => {
      const paths = getPaths(service, pageType);
      paths.forEach(currentPath => {
        describe(`${pageType} - ${currentPath} - Canonical`, () => {
          before(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(currentPath, pageType);
          });
          crossPlatformTests({
            service,
            pageType,
          });
          testsForCanonicalOnly({
            service,
            pageType,
            variant,
          });
        });
      });
      paths
        .map(path => `${path}.amp`)
        .forEach(currentPath => {
          describe(`${pageType} - ${currentPath} - Canonical`, () => {
            before(() => {
              Cypress.env('currentPath', currentPath);
              visitPage(currentPath, pageType);
            });
            crossPlatformTests({
              service,
              pageType,
            });
            testsForAMPOnly({
              service,
              pageType,
              variant,
            });
          });
        });
    });
});
