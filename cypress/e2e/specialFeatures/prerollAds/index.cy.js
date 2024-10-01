import path from 'ramda/src/path';
import getAppEnv from '../../../support/helpers/getAppEnv';
import { mapsWithPreroll, mapsWithoutPreroll } from './config';

const environment = getAppEnv();

describe('Media Asset Pages - Preroll Ads', () => {
  describe('should not load the preroll ad plugin', () => {
    const noPreroll = mapsWithoutPreroll[environment];

    if (noPreroll && noPreroll.length > 0) {
      noPreroll.forEach(map => {
        const { paths, reason } = map;

        describe(`because ${reason}`, () => {
          paths.forEach(url => {
            it(url, () => {
              cy.visit(url);
              cy.get(`script[src*="dotcom-bootstrap.js"]`).should('not.exist');
            });
          });
        });
      });
    } else {
      it(`No MAPs without preroll ads configured for the ${environment} environment`, () => {});
    }
  });

  describe('should load the preroll ad plugin', () => {
    const withPreroll = mapsWithPreroll[environment];

    if (withPreroll && withPreroll.length > 0) {
      withPreroll.forEach(map => {
        const { paths, service } = map;

        if (paths.length > 0) {
          paths.forEach(url => {
            it(url, () => {
              cy.getToggles(service).then(() => {
                cy.fixture(`toggles/${service}.json`).then(toggles => {
                  const adsEnabled = path(['preroll', 'enabled'], toggles);

                  if (adsEnabled) {
                    cy.visit(url);
                    cy.get(`script[src*="dotcom-bootstrap.js"]`).should(
                      'exist',
                    );
                  }
                });
              });
            });
          });
        }
      });
    } else {
      it(`No MAPs with preroll ads configured for the ${environment} environment`, () => {});
    }
  });
});
