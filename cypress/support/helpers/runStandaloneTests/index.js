import config from '../../config/services';
import serviceHasPageType from '../serviceHasPageType';
import getPaths from '../getPaths';
import { visitPage } from '../runTestsForPage';

export default ({
  pageType,
  runTests = () => {},
  runAmpTests = () => {},
  runCanonicalTests = () => {},
}) => {
  Object.keys(config)
    .filter((service) => serviceHasPageType(service, pageType))
    .forEach((service) => {
      const paths = getPaths(service, pageType);
      const { variant } = config[service];

      paths.forEach((path) => {
        describe(`${pageType} tests for ${service} - ${path}`, () => {
          const testArgs = {
            canonicalPath: path,
            service,
            variant,
          };

          describe('Canonical', () => {
            beforeEach(() => {
              visitPage(path, pageType);
            });

            runTests(testArgs);
            runCanonicalTests(testArgs);
          });

          describe('AMP', () => {
            const ampPath = `${path}.amp`;

            beforeEach(() => {
              visitPage(ampPath, pageType);
            });

            runTests(testArgs);
            runAmpTests(testArgs);
          });
        });
      });
    });
};
