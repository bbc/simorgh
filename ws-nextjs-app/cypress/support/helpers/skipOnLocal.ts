export default Cypress.expose('APP_ENV') !== 'local' ? describe : describe.skip;
