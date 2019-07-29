import describeForEuOnly from '../support/describeForEuOnly';
import { describeForLocalOnly } from '../support/limitEnvRuns';
import services from '../../src/app/lib/config/services';

Object.keys(services).forEach(index => {
  const serviceConfig = services[index];
  const service = index;

  // This should be unhacked when this file is consolidated with other cookie testing files.
  if (service === 'news' || service === 'default') {
    return;
  }

  // These tests work locally, but fail on Test & Live environments since they have
  // not yet been set up to have the correct translated cookie banners on the error pages
  describeForLocalOnly('World Service Cookie banner Translations', () => {
    describe('Canonical', () => {
      it(`should load the relevant translations for ${service}`, () => {
        cy.worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          `/${service}/articles/c0000000000o`,
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
          `/${service}/articles/c0000000000o.amp`,
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });
  });
});
