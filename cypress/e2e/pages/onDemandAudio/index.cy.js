import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';
import e2eTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';

const pageType = 'onDemandAudio';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    // eslint-disable-next-line prefer-const
    let { variant, name: service } = config[serviceId];

    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);

          const newPath = `${currentPath}${overrideRendererOnTest()}`;

          visitPage(newPath, pageType);
        });
        e2eTests({
          service,
          pageType,
          variant,
        });
      });
    });
  });
