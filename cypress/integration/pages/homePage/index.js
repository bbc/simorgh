import urls from './urls';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';
import runTests from './tests';

const pageType = 'home';

urls.forEach(url => {
  const { service, variant = 'default' } = url;
  const paths = url[getAppEnv()];

  paths.forEach(currentPath => {
    describe(`${pageType} - ${currentPath}`, () => {
      before(() => {
        Cypress.env('currentPath', currentPath);
        visitPage(currentPath, pageType);
      });

      runTests({
        service,
        pageType,
        variant,
      });
    });
  });
});
