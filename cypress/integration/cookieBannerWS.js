import config from '../support/cookieConfig';
import { worldServiceCookieBannerTranslations } from '../support/bodyTestHelper';

describe('World Service Cookie Banner Test', () => {
  const services = Object.keys(config);
  services.forEach(serviceName => {
    it(`should load the relevant translations for ${serviceName} (canonical)`, () => {
      worldServiceCookieBannerTranslations(
        `${config[serviceName].assets.privacyStatement}`,
        `${config[serviceName].assets.performanceStatement}`,
        `${config[serviceName].assets.serviceURL}`,
        `${config[serviceName].assets.privacyAgreement}`,
        `${config[serviceName].assets.cookieAgreement}`,
      );
    });

    it(`should load the relevant translations for ${serviceName} (AMP)`, () => {
      worldServiceCookieBannerTranslations(
        `${config[serviceName].assets.privacyStatement}`,
        `${config[serviceName].assets.performanceStatement}`,
        `${config[serviceName].assets.serviceURL}.amp`,
        `${config[serviceName].assets.privacyAgreement}`,
        `${config[serviceName].assets.cookieAgreement}`,
      );
    });
  });
});
