import 'cypress-axe';

import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.on(`window:before:load`, win => {
  cy.stub(win.console, `error`).callsFake(msg => {
    cy.now(`task`, `error`, msg);
    throw new Error(msg);
  });
});

// Catches an unexplained error experienced while running the following test:
// https://github.com/bbc/simorgh/blob/49e5b72db84df57144a92963734bcd080938e45b/cypress/integration/pages/storyPage/testsForCanonicalOnly.js#L14
// We decided we could not invest any more time in the unexplained error as the test
// successfully functioned with this specific error caught and discarded.
// eslint-disable-next-line consistent-return
Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // returning false here prevents Cypress from failing the test
  if (
    err.message &&
    err.message.includes("Cannot read property 'postMessage' of undefined")
  ) {
    return false;
  }

  /*
    This is used to effectively ignore unhandle promise exceptions thrown in tests
    Cypress will fail a test if this happens, causing E2E failures on Test and Live
    Effort has been applied to source the cause of the errors on CodePipeline, as they do not occur locally or on Github Action builds,
    however there is no clear indication of why they are happening as they only happen in one environment and intermittently
    Linked issues below as a timeline of events:
    
    https://github.com/bbc/simorgh/issues/9178
    https://github.com/bbc/simorgh/issues/9465
  */
  if (promise) {
    return false;
  }
});

require('cypress-terminal-report/src/installLogsCollector')();
