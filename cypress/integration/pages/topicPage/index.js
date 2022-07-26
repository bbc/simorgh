import { v4 as uuid } from 'uuid';
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
          let newPath;
          if (Cypress.env('APP_ENV') !== 'live') {
            newPath = `${currentPath}${overrideRendererOnTest()}&id=${uuid()}`;
          } else {
            newPath = `${currentPath}?id=${uuid()}`;
          }
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
