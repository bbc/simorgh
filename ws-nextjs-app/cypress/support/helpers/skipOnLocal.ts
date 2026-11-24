export default Cypress.env('APP_ENV') !== 'local' ? describe : describe.skip;
