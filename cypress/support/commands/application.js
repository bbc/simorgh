Cypress.Commands.add('testArticleServiceWorker200s', service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/articles/sw.js`,
      200,
      'application/javascript',
    );
  });
});

Cypress.Commands.add('testFrontpageServiceWorker200s', service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/sw.js`,
      200,
      'application/javascript',
    );
  });
});

Cypress.Commands.add('testManifest200s', service => {
  it(`should return a 200 status code for ${service}`, () => {
    cy.testResponseCodeAndType(
      `/${service}/articles/manifest.json`,
      200,
      'application/json',
    );
  });
});

Cypress.Commands.add('testManifestServicePaths', service => {
  it(`should return a 200 status code for ${service} without /articles`, () => {
    cy.testResponseCodeAndType(
      `/${service}/manifest.json`,
      200,
      'application/json',
    );
  });
});
