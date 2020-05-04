export default (path, pageType) => {
  const expectedContentType = 'text/html';
  const isErrorPage = pageType.includes('error');
  const expectedStatus = isErrorPage ? 404 : 200;
  const failOnStatusCode = !isErrorPage;

  cy.testResponseCodeAndType(path, expectedStatus, expectedContentType);
  cy.visit(path, {
    failOnStatusCode,
  });
};
