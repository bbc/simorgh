Cypress.Commands.add('onLocal', tests => {
  if (Cypress.env('APP_ENV') === 'local') {
    tests();
  }
});
