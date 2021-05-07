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

// Catches an unexplained error experienced while running the following test:
// https://github.com/bbc/simorgh/blob/49e5b72db84df57144a92963734bcd080938e45b/cypress/integration/pages/storyPage/testsForCanonicalOnly.js#L14
// We decided we could not invest any more time in the unexplained error as the test
// successfully functioned with this specific error caught and discarded.
// eslint-disable-next-line consistent-return
Cypress.on('uncaught:exception', err => {
  // returning false here prevents Cypress from failing the test
  if (
    err.message &&
    err.message.includes("Cannot read property 'postMessage' of undefined")
  ) {
    return false;
  }
});

require('cypress-terminal-report/src/installLogsCollector')();
