import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.on(`window:before:load`, win => {
  cy.stub(win.console, `error`, msg => {
    cy.now(`task`, `error`, msg);
    throw new Error(msg);
  });
});

// Workaround for AMP same-origin errors
// Can be removed when https://github.com/bbc/simorgh/issues/3970 is resolved
// eslint-disable-next-line consistent-return
Cypress.on('uncaught:exception', err => {
  // returning false here prevents Cypress from failing the test
  if (
    err.message &&
    err.message.match(/Origin of <amp-iframe> must not be equal to container/)
  ) {
    return false;
  }
});
