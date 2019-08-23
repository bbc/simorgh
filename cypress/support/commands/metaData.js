/* As these are generalised, they should be moved out of this
 * checkArticlesMetadata command and into the
 * checkSharedSocialmediaMetadata command
 */

Cypress.Commands.add(
  'checkArticlesMetadata',
  ({
    articleAuthor,
    description, // eslint-disable-line no-unused-vars
    imageUrl,
    altText,
    locale,
    siteName,
    title, // eslint-disable-line no-unused-vars
    type,
    url,
    twitterCard,
    twitterCreator,
    twitterDescription, // eslint-disable-line no-unused-vars
    twitterImageAlt,
    twitterImageSrc,
    twitterSite,
    twitterTitle, // eslint-disable-line no-unused-vars
  }) => {
    cy.get('meta[name="article:author"]').should(
      'have.attr',
      'content',
      articleAuthor,
    );
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

    cy.get('head meta[name="og:locale"]').should(
      'have.attr',
      'content',
      locale,
    );
    cy.get('head meta[name="og:site_name"]').should(
      'have.attr',
      'content',
      siteName,
    );

    cy.get('head').within(() => {
      cy.get('meta[name="twitter:card"]').should(
        'have.attr',
        'content',
        twitterCard,
      );
      cy.get('meta[name="twitter:creator"]').should(
        'have.attr',
        'content',
        twitterCreator,
      );
      cy.get('meta[name="twitter:image:alt"]').should(
        'have.attr',
        'content',
        twitterImageAlt,
      );
      cy.get('meta[name="twitter:image:src"]').should(
        'have.attr',
        'content',
        twitterImageSrc,
      );
      cy.get('meta[name="twitter:site"]').should(
        'have.attr',
        'content',
        twitterSite,
      );
      // cy.get('meta[name="twitter:description"]').should(
      //   'have.attr',
      //   'content',
      //   twitterDescription,
      // ); // !!! Remove eslint-disabling comment above when un-commenting this test.
      // cy.get('meta[name="twitter:title"]').should(
      //   'have.attr',
      //   'content',
      //   twitterTitle,
      // ); // !!! Remove eslint-disabling comment above when un-commenting this test.
    });
    cy.get('head meta[name="twitter:creator"]').should(
      'have.attr',
      'content',
      twitterCreator,
    );
    cy.get('head meta[name="twitter:image:alt"]').should(
      'have.attr',
      'content',
      twitterImageAlt,
    );
    cy.get('head meta[name="twitter:image:src"]').should(
      'have.attr',
      'content',
      twitterImageSrc,
    );
    cy.get('head meta[name="twitter:site"]').should(
      'have.attr',
      'content',
      twitterSite,
    );
  },
);

Cypress.Commands.add(
  'checkSharedSocialmediaMetadata',
  ({ fbAdmins, appID }) => {
    cy.get('head').within(() => {
      cy.get('meta[name="fb:admins"]').should('have.attr', 'content', fbAdmins);
      cy.get('meta[name="fb:app_id"]').should('have.attr', 'content', appID);
    });
  },
);
