import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import e2eTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';

const pageType = 'onDemandTV';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    const { variant, name: service } = config[serviceId];
    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        beforeEach(() => {
          Cypress.env('currentPath', currentPath);
          const newPath = `${Cypress.env(
            'currentPath',
          )}${overrideRendererOnTest()}`;
          visitPage(newPath, pageType);
        });
        e2eTests({
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
          beforeEach(() => {
            Cypress.env('currentPath', currentPath);
            visitPage(currentPath, pageType);
          });
          e2eTests({
            service,
            pageType,
            variant,
          });
        });
      });
  });
