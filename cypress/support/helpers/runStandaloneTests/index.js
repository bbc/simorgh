import config from '../../config/services';
import serviceHasPageType from '../serviceHasPageType';
import getPaths from '../getPaths';
import { visitPage } from '../runTestsForPage';

export default ({ pageType, runAmpUserTests, runCanonicalUserTests }) => {
  Object.keys(config)
    .filter(service => serviceHasPageType(service, pageType))
    .forEach(service => {
      const paths = getPaths(service, pageType);
      const { variant } = config[service];

      paths.forEach(path => {
        describe(`${pageType} tests for ${service} - ${path}`, () => {
          describe('Canonical', () => {
            before(() => {
              Cypress.env('currentPath', path);
              visitPage(path, pageType);
            });

            runCanonicalUserTests({ service, variant });
          });

          describe('AMP', () => {
            const ampPath = `${path}.amp`;

            before(() => {
              visitPage(ampPath, pageType);
            });

            runAmpUserTests({ service, variant });
          });
        });
      });
    });
};
