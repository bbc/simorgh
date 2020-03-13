import services from '../../../../cypress/support/config/services';
import userTests from './user.test';
import commonTests from './common.test';

describe('Live Radio', () => {
  const liveRadio = 'liveRadio';

  Object.keys(services).forEach(service => {
    Object.keys(services[service].pageTypes)
      .filter(pageType => pageType === liveRadio)
      .forEach(() => {
        const { paths } = services[service].pageTypes[liveRadio];
        const livePaths = (paths && paths.live) || [];
        livePaths.forEach(pageUrl => {
          describe(`${pageUrl}`, () => {
            const jsonData = require(`../../pageData${pageUrl}`); // eslint-disable-line import/no-dynamic-require, global-require
            const { variant } = services[service];

            // eslint-disable-next-line import/no-dynamic-require, global-require
            const serviceConfig = require(`../../../../src/app/lib/config/services/${service}`)
              .service[variant];

            const testArgs = {
              pageUrl,
              jsonData,
              serviceConfig,
            };

            userTests(testArgs);
            commonTests(testArgs);
          });
        });
      });
  });
});
