Cypress.Commands.add('assertCookieValue', (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
});

Cypress.Commands.add('assertCookieExpiryDate', (cookieName, timestamp) => {
  const testBuffer = 60;
  cy.getCookie(cookieName).then(c => {
    expect(c.expiry).to.be.within(
      timestamp - testBuffer,
      timestamp + testBuffer,
    );
  });
});
