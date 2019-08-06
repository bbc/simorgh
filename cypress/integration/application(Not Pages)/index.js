import config from '../../../src/app/lib/config/services';
import { describeForLocalOnly } from '../../support/limitEnvRuns';

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

const createRequestUrl = service => {
  const serviceVariant = serviceVariantMapping[service];
  if (serviceVariant)
    return `/${serviceVariant.service}/${serviceVariant.variant}`;

  return `/${service}`;
};

describeForLocalOnly('Application', () => {
  Object.keys(config)
    .filter(service => service !== 'default')
    .forEach(service => {
      // All services test sws
      it(`should return a 200 status code for ${service}'s service worker`, () => {
        cy.testResponseCodeAndType(
          `${createRequestUrl(service)}/sw.js`,
          200,
          'application/javascript',
        );
      });

      it(`should return a 200 status code for ${service} manifest file`, () => {
        cy.testResponseCodeAndType(
          `/${service}/manifest.json`,
          200,
          'application/json',
        );
      });
    });
});

describe('Application', () => {
  it('should return a 200 status code for the news service worker', () => {
    cy.testResponseCodeAndType(
      '/news/articles/sw.js',
      200,
      'application/javascript',
    );
  });

  // Once all manifest are done this should be move into the object forEach above
  ['igbo', 'news/articles', 'pidgin', 'yoruba'].forEach(service => {
    it(`should return a 200 status code for ${service} manifest file`, () => {
      cy.testResponseCodeAndType(
        `/${service}/manifest.json`,
        200,
        'application/json',
      );
    });
  });
});
