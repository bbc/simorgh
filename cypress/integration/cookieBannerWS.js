import config from '../support/cookieConfig';
import { worldServiceCookieBannerTranslations } from '../support/bodyTestHelper';
import describeForEuOnly from '../support/describeForEuOnly';

const services = Object.keys(config);

describe('World Service Cookie Banner Transations - Canonical', () => {
  services.forEach(serviceName => {
    xit(`should load the relevant translations for ${serviceName}`, () => {
      worldServiceCookieBannerTranslations(
        `${config[serviceName].assets.privacyStatement}`,
        `${config[serviceName].assets.performanceStatement}`,
        `${config[serviceName].assets.mockArticleURL}`,
        `${config[serviceName].assets.privacyAgreement}`,
        `${config[serviceName].assets.cookieAgreement}`,
      );
    });
  });
});

describeForEuOnly('World Service Cookie Banner Transations - AMP', () => {
  services.forEach(serviceName => {
    xit(`should load the relevant translations for ${serviceName}`, () => {
      worldServiceCookieBannerTranslations(
        `${config[serviceName].assets.privacyStatement}`,
        `${config[serviceName].assets.performanceStatement}`,
        `${config[serviceName].assets.mockAmpArticleURL}`,
        `${config[serviceName].assets.privacyAgreement}`,
        `${config[serviceName].assets.cookieAgreement}`,
      );
    });
  });
});
