// Overwriting Cypress Commands should very rarely be done.
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  cy.request({ url, failOnStatusCode: false }).then(({ headers }) => {
    // Always ensure we're not seeing the Mozart fallback
    if (expect(headers).not.have.property('x-mfa')) {
      return originalFn(url, options);
    }

    return false;
  });
});

// Addding Cypress Commands is safe, add away...
Cypress.Commands.add('testResponseCodeAndType', (path, responseCode, type) => {
  cy.request({ url: path, failOnStatusCode: false }).then(
    ({ status, headers }) => {
      expect(status).to.eq(responseCode);
      expect(headers['content-type']).to.include(type);
      // Always ensure we're not seeing the Mozart fallback
      expect(headers).not.to.have.property('x-mfa');
    },
  );
});

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
