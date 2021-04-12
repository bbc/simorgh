export default (path, pageType) => {
  const expectedContentType = 'text/html';
  const isErrorPage = pageType.includes('error');
  const expectedStatus = isErrorPage ? 404 : 200;
  const failOnStatusCode = !isErrorPage;

  cy.testResponseCodeAndType({
    path,
    responseCode: expectedStatus,
    type: expectedContentType,
  });

  cy.intercept('https://gn-flagpoles.api.bbci.co.uk/ngas', {
    fixture: 'flagpoles/ngas.json',
  });
  cy.intercept('https://gn-flagpoles.test.api.bbci.co.uk/ngas', {
    fixture: 'flagpoles/ngas.json',
  });

  cy.visit(path, {
    failOnStatusCode,
  });
};
