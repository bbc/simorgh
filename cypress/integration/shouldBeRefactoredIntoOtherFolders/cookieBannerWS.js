import describeForEuOnly from '../../support/describeForEuOnly';
import { describeForLocalAndTest } from '../../support/limitEnvRuns';
import config from '../../../src/app/lib/config/services';

Object.keys(config).forEach(index => {
  const serviceConfig = config[index];
  const service = index;

  // This should be unhacked when this file is consolidated with other cookie testing files.
  const skippedconfig = ['news', 'cymrufyw', 'naidheachdan']; // Not WS
  skippedconfig.push('serbian', 'telugu', 'ukchina', 'zhongwen'); // Not on test.bbc.com yet
  skippedconfig.push('default'); // Not a service
  if (skippedconfig.includes(service)) {
    return;
  }

  describeForLocalAndTest('World Service Cookie banner Translations', () => {
    describe('Canonical', () => {
      it(`should load the relevant translations for ${service}`, () => {
        cy.worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          `/${service}`,
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });

    describeForEuOnly('AMP', () => {
      it(`should load the relevant translations for ${service}`, () => {
        cy.worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          `/${service}`,
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });
  });
});
