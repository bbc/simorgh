Cypress.Commands.add('checkMetadataContent', (metaDataTag, content) => {
  cy.get(metaDataTag).should('have.attr', 'content', content);
});

Cypress.Commands.add(
  'checkFacebookMetadata',
  (fbAdmins, appID, articleAuthor) => {
    cy.get('head').within(() => {
      cy.get('meta[name="fb:admins"]').should('have.attr', 'content', fbAdmins);
      cy.get('meta[name="fb:app_id"]').should('have.attr', 'content', appID);
      cy.get('meta[name="article:author"]').should(
        'have.attr',
        'content',
        articleAuthor,
      );
    });
  },
);

Cypress.Commands.add('checkAMPArticleMetadata', (AMPURL, win) => {
  // This will only work if you visit the matching canonical
  // url prior to running this.
  // AMP overrides the Window data in window.SIMORGH_DATA. In order to get
  // around this we visit the canonical page first to retrieve
  // window.SIMORGH_DATA and use this to compare against the metadata
  // served in the head of an AMP page.
  cy.visit(AMPURL);
  cy.get('head').within(() => {
    cy.get('meta[name="description"]').should(
      'have.attr',
      'content',
      win.pageData.promo.summary || win.pageData.promo.headlines.seoHeadline,
    );
    cy.get('meta[name="og:title"]').should(
      'have.attr',
      'content',
      win.pageData.promo.headlines.seoHeadline,
    );
    cy.get('meta[name="og:type"]').should(
      'have.attr',
      'content',
      win.pageData.metadata.type,
    );
    cy.get('meta[name="article:published_time"]').should(
      'have.attr',
      'content',
      new Date(win.pageData.metadata.firstPublished).toISOString(),
    );
    cy.get('meta[name="article:modified_time"]').should(
      'have.attr',
      'content',
      new Date(win.pageData.metadata.lastPublished).toISOString(),
    );
  });

  cy.get('html').should(
    'have.attr',
    'lang',
    win.pageData.metadata.passport.language,
  );
});

Cypress.Commands.add('checkOpenGraphMetadata', (
  description, // eslint-disable-line no-unused-vars
  imageUrl,
  altText,
  locale,
  siteName,
  title, // eslint-disable-line no-unused-vars
  type,
  url,
) => {
  it('should have OpenGraph meta data', () => {
    cy.get('head').within(() => {
      cy.get('meta[name="og:image"]').should('have.attr', 'content', imageUrl);
      cy.get('meta[name="og:image:alt"]').should(
        'have.attr',
        'content',
        altText,
      );
      cy.get('meta[name="og:locale"]').should('have.attr', 'content', locale);
      cy.get('meta[name="og:site_name"]').should(
        'have.attr',
        'content',
        siteName,
      );
      cy.get('meta[name="og:type"]').should('have.attr', 'content', type);
      cy.get('meta[name="og:url"]').should('have.attr', 'content', url);
      // cy.get('meta[name="og:title"]').should('have.attr', 'content', title); // !!! Remove eslint-disabling comment above when un-commenting this test.
      // cy.get('meta[name="og:description"]').should('have.attr', 'content', description); // !!! Remove eslint-disabling comment above when un-commenting this test.
    });

    cy.checkMetadataContent('head meta[name="og:locale"]', locale);
    cy.checkMetadataContent('head meta[name="og:site_name"]', siteName);
  });
});

Cypress.Commands.add('checkTwitterMetadata', (
  card,
  creator,
  description, // eslint-disable-line no-unused-vars
  imageAlt,
  imageSrc,
  site,
  title, // eslint-disable-line no-unused-vars
) => {
  it('should have Twitter meta data', () => {
    cy.get('head').within(() => {
      cy.get('meta[name="twitter:card"]').should('have.attr', 'content', card);
      cy.get('meta[name="twitter:creator"]').should(
        'have.attr',
        'content',
        creator,
      );
      cy.get('meta[name="twitter:image:alt"]').should(
        'have.attr',
        'content',
        imageAlt,
      );
      cy.get('meta[name="twitter:image:src"]').should(
        'have.attr',
        'content',
        imageSrc,
      );
      cy.get('meta[name="twitter:site"]').should('have.attr', 'content', site);
      // cy.get('meta[name="twitter:description"]').should(
      //   'have.attr',
      //   'content',
      //   description,
      // ); // !!! Remove eslint-disabling comment above when un-commenting this test.
      // cy.get('meta[name="twitter:title"]').should(
      //   'have.attr',
      //   'content',
      //   title,
      // ); // !!! Remove eslint-disabling comment above when un-commenting this test.
    });
    cy.checkMetadataContent('head meta[name="twitter:creator"]', creator);
    cy.checkMetadataContent('head meta[name="twitter:image:alt"]', imageAlt);
    cy.checkMetadataContent('head meta[name="twitter:image:src"]', imageSrc);
    cy.checkMetadataContent('head meta[name="twitter:site"]', site);
  });
});

Cypress.Commands.add('checkCanonicalURL', URL => {
  cy.get('head link[rel="canonical"]').should('have.attr', 'href', URL);
});

Cypress.Commands.add('checkAmpHTML', amphtml => {
  cy.get('head link[rel="amphtml"]').should('have.attr', 'href', amphtml);
});
