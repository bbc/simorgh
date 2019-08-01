import { worldServiceCookieBannerTranslations } from '../support/bodyTestHelper';
import describeForEuOnly from '../support/describeForEuOnly';
import { describeForLocalAndTest } from '../support/limitEnvRuns';
import services from '../../src/app/lib/config/services';

const serviceVariantMapping = {
  serbianLat: {
    service: 'serbian',
    variant: 'lat',
  },
  serbianCyr: {
    service: 'serbian',
    variant: 'cyr',
  },
  zhongwenSimp: {
    service: 'zhongwen',
    variant: 'simp',
  },
  zhongwenTrad: {
    service: 'zhongwen',
    variant: 'trad',
  },
  ukchinaSimp: {
    service: 'ukchina',
    variant: 'simp',
  },
  ukchinaTrad: {
    service: 'ukchina',
    variant: 'trad',
  },
};

const createRequestUrl = (service, isAmp = false) => {
  const serviceVariant = serviceVariantMapping[service];
  if (serviceVariant) {
    return isAmp
      ? `/${serviceVariant.service}/${serviceVariant.variant}.amp`
      : `/${serviceVariant.service}/${serviceVariant.variant}`;
  }

  return isAmp ? `/${service}.amp` : `/${service}`;
};

Object.keys(services).forEach(index => {
  const serviceConfig = services[index];
  const service = index;

  // This should be unhacked when this file is consolidated with other cookie testing files.
  const skippedServices = ['news', 'cymrufyw', 'naidheachdan']; // Not WS
  skippedServices.push('serbian', 'telugu', 'ukchina', 'zhongwen'); // Not on test.bbc.com yet
  skippedServices.push('default'); // Not a service
  if (skippedServices.includes(service)) {
    return;
  }

  describeForLocalAndTest('World Service Cookie banner Translations', () => {
    describe('Canonical', () => {
      it(`should load the relevant translations for ${service}`, () => {
        worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          createRequestUrl(service),
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });

    describeForEuOnly('AMP', () => {
      it(`should load the relevant translations for ${service}`, () => {
        worldServiceCookieBannerTranslations(
          `${serviceConfig.translations.consentBanner.privacy.title}`,
          `${serviceConfig.translations.consentBanner.cookie.title}`,
          createRequestUrl(service, true),
          `${serviceConfig.translations.consentBanner.privacy.accept}`,
          `${serviceConfig.translations.consentBanner.cookie.accept}`,
        );
      });
    });
  });
});
