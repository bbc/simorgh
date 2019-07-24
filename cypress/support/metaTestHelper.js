export const assertCookieValue = (cookieName, value) => {
  cy.getCookie(cookieName).should('have.property', 'value', value);
};

export const assertCookieExpiryDate = (cookieName, timestamp) => {
  const testBuffer = 60;
  cy.getCookie(cookieName).then(c => {
    expect(c.expiry).to.be.within(
      timestamp - testBuffer,
      timestamp + testBuffer,
    );
  });
};
