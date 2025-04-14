/* eslint-disable no-underscore-dangle */
import shouldSmokeTest from '../../cypress/support/helpers/shouldSmokeTest';
import serviceHasPageType from '../../cypress/support/helpers/serviceHasPageType';
import config from '../../cypress/support/config/services';
import getPaths from '../../cypress/support/helpers/getPaths';
import {
  assertLoadsExpectedBundles,
  assertLoadsModernBundles,
} from './assertions';
import runTestsForPage from '../runTestsForPage';
import context from '../context';

global.Cypress = { env: () => 'local' };

jest.setTimeout(context.TIMEOUT); // overriding the default jest timeout

const onPageRequest = request => {
  if (!context.page.__requests) {
    context.page.__requests = [];
  }
  context.page.__requests.push(request.url());
};

const testSuites = Object.keys(config)
  .map(serviceId => {
    return Object.keys(config[serviceId].pageTypes)
      .filter(
        pageType =>
          shouldSmokeTest(pageType, serviceId) &&
          serviceHasPageType(serviceId, pageType),
      )
      .map(pageType => {
        const paths = getPaths(serviceId, pageType);

        const [path] = paths;

        return {
          path,
          pageType,
          service: config[serviceId].name,
          runforEnv: ['local'],
          tests: [assertLoadsExpectedBundles, assertLoadsModernBundles],
        };
      });
  })
  .flat();

runTestsForPage({ testSuites, onPageRequest });
