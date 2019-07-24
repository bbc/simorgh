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

Cypress.Commands.add('retrieveMetaDataContent', (metaDataTag, content) => {
  cy.get(metaDataTag).should('have.attr', 'content', content);
});

Cypress.Commands.add('facebookMeta', (fbAdmins, appID, articleAuthor) => {
  cy.get('head meta[name="fb:admins"]').should(
    'have.attr',
    'content',
    fbAdmins,
  );
  cy.get('head meta[name="fb:app_id"]').should('have.attr', 'content', appID);
  cy.get('head meta[name="article:author"]').should(
    'have.attr',
    'content',
    articleAuthor,
  );
});

Cypress.Commands.add('metadataAssertion', () => {
  cy.window().then(win => {
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      win.SIMORGH_DATA.pageData.promo.summary ||
        win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
    );
    cy.get('head meta[name="og:title"]').should(
      'have.attr',
      'content',
      win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
    );
    cy.get('head meta[name="og:type"]').should(
      'have.attr',
      'content',
      win.SIMORGH_DATA.pageData.metadata,
    );
    cy.get('head meta[name="article:published_time"]').should(
      'have.attr',
      'content',
      new Date(win.SIMORGH_DATA.pageData.metadata.firstPublished).toISOString(),
    );
    cy.get('head meta[name="article:modified_time"]').should(
      'have.attr',
      'content',
      new Date(win.SIMORGH_DATA.pageData.metadata.lastPublished).toISOString(),
    );
    cy.get('html').should(
      'have.attr',
      'lang',
      win.SIMORGH_DATA.pageData.metadata.passport,
    );
  });
});
