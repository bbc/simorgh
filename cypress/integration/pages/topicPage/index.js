import config from '../../../support/config/services';
import getPaths from '../../../support/helpers/getPaths';
import serviceHasPageType from '../../../support/helpers/serviceHasPageType';

import crossPlatformTests from './tests';
import visitPage from '../../../support/helpers/visitPage';
import { overrideRendererOnTest } from '../../../support/helpers/onDemandRadioTv';

const pageType = 'topicPage';
Object.keys(config)
  .filter(service => serviceHasPageType(service, pageType))
  .forEach(serviceId => {
    const { variant, name: service } = config[serviceId];

    const paths = getPaths(serviceId, pageType);
    paths.forEach(currentPath => {
      describe(`${pageType} - ${currentPath}`, () => {
        before(() => {
          Cypress.env('currentPath', currentPath);

          const newPath = `${currentPath}${overrideRendererOnTest()}`;

          visitPage(newPath, pageType);
        });
        crossPlatformTests({
          service,
          pageType,
          variant,
        });
      });
    });
  });
