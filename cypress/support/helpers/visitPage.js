import { dataEndpointOverride } from './onDemandRadioTv';

export default (path, pageType) => {
  const expectedContentType = 'text/html';
  const isErrorPage = pageType.includes('error');
  const expectedStatus = isErrorPage ? 404 : 200;
  const failOnStatusCode = !isErrorPage;
  const newPath = `${path}${dataEndpointOverride()}`;
  cy.testResponseCodeAndType(newPath, expectedStatus, expectedContentType);

  cy.visit(newPath, {
    failOnStatusCode,
  });
};
