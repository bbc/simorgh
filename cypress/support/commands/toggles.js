import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';
import envConfig from '../config/envs';
import getAppEnv from '../helpers/getAppEnv';
import defaultToggles from '../../../src/app/lib/config/toggles';

Cypress.Commands.add(
  'getToggles',
  memoizeWith(identity, service => {
    const togglesFixture = `cypress/fixtures/toggles/${service}.json`;

    if (getAppEnv() === 'local') {
      cy.writeFile(togglesFixture, defaultToggles.local);
    } else {
      cy.request({
        url: `${envConfig.togglesUrl}?application=simorgh&service=${service}&__amp_source_origin=${envConfig.baseUrl}`,
        headers: {
          Origin: 'https://www.bbc.com',
        },
      }).then(response => {
        cy.writeFile(togglesFixture, response.body.toggles);
      });
    }
  }),
);
