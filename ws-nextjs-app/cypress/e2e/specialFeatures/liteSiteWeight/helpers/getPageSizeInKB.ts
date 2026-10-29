export default (url, isCompressed) =>
  cy.task('getPageSizeInKB', { url, isCompressed });
