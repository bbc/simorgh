const envConfig = require('../../config/envs');

/* Download the data file for that URL
 * and copy to the cypress/fixtures directory
 */
export const downloadPageData = path => {
  Cypress.env('currentPath', path);
  const dataUrl = `${envConfig.baseUrl}/${path}.json`;

  cy.request(dataUrl).then(dataFile => {
    cy.writeFile(`cypress/fixtures/${path}.json`, dataFile);
    cy.fixture(Cypress.env('currentPath')).as('pageData');
  });
};

export const deletePageData = () => {
  const dataFile = `cypress/fixtures/${Cypress.env('currentPath')}.json`;
  try {
    cy.exec(`rm ${dataFile}`);
  } catch (error) {
    cy.log(error);
  }
};
