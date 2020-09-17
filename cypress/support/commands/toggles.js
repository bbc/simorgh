import memoizeWith from 'ramda/src/memoizeWith';
import identity from 'ramda/src/identity';
import envConfig from '../config/envs';

Cypress.Commands.add(
  'getToggles',
  memoizeWith(identity, service => {
    cy.request({
      url: `${envConfig.togglesUrl}?application=simorgh&service=${service}&__amp_source_origin=${envConfig.baseUrl}`,
      headers: {
        Origin: 'https://www.bbc.co.uk',
      },
    }).then(response => {
      cy.writeFile(
        `cypress/fixtures/toggles/${service}.json`,
        response.body.toggles,
      );
    });
  }),
);
