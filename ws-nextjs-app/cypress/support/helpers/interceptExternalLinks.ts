export default ({ httpCode }) => {
  cy.intercept('GET', 'https://www.whatsapp.com/**', {
    statusCode: httpCode,
    body: '',
  });
};
