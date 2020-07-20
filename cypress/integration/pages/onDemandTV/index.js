import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import testsForCanonicalOnly from './testsForCanonicalOnly';
import testsForAMPOnly from './testsForAMPOnly';
import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';

const pageType = 'onDemandTV';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    const { variant, name: service } = config[serviceId];
    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
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
    paths
      .map(path => `${path}.amp`)
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
          testsForAMPOnly({
            service,
            pageType,
            variant,
          });
        });
      });
  });
