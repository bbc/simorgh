import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import getUrls from './urls';
import getAppEnv from '../../../support/helpers/getAppEnv';
import visitPage from '../../../support/helpers/visitPage';
import crossPlatformTests from './tests';
import ampTests from './testsForAMPOnly';
import canonicalTests from './testsForCanonicalOnly';
import envConfig from '../../../support/config/envs';

const pageType = HOME_PAGE;

const environment = getAppEnv();
const canonicalUrls = getUrls();
const ampUrls = canonicalUrls.map(url => {
  return { ...url, [environment]: `${url[environment]}.amp` };
});

const urls = [...canonicalUrls, ...ampUrls];

urls.forEach(url => {
  const { service, variant = 'default' } = url;
  const currentPath = url[environment];

  if (currentPath) {
    describe(`${pageType} - ${envConfig.baseUrl}${currentPath}`, () => {
      before(() => {
        Cypress.env('currentPath', currentPath);
        visitPage(currentPath, pageType);
      });

      crossPlatformTests({
        service,
        pageType,
        variant,
      });

      if (currentPath.includes('.amp')) {
        ampTests({ service, pageType, variant });
      } else {
        canonicalTests({ service, pageType, variant });
      }
    });
  }
});
