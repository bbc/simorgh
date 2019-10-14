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

Cypress.on('fail', error => {
  console.log('khoa phan: This test failed');
  Cypress.runner.stop();
  throw error; // throw error to have test fail
});
