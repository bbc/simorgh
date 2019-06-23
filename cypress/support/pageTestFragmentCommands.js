Cypress.Commands.add('headerTestBBCNewsString', () => {
  cy.get('header a').should('contain', 'BBC News');
});

Cypress.Commands.add('headerTestVisibleBanner', canonicalLink => {
  cy.get('header')
    .should('have.lengthOf', 1)
    .find('a')
    .should('have.attr', 'href', `${canonicalLink}`)
    .find('svg')
    .should('be.visible');
});

Cypress.Commands.add('headerTestHaveH1', () => {
  cy.get('h1').should('have.length', 1);
});

Cypress.Commands.add('footerTestBranding', canonicalLink => {
  cy.get('footer')
    .should('have.length', 1)
    .should('have.attr', 'role', 'contentinfo')
    .find('a')
    .eq(0)
    .should('contain', 'BBC News')
    .and('have.attr', 'href', `${canonicalLink}`)
    .find('svg')
    .should('be.visible');
});

Cypress.Commands.add('footerTestWorkingLinksHeloer', (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
});

Cypress.Commands.add('footerTestWorkingLinks', () => {
  cy.get('footer ul').within(() => {
    cy.footerTestWorkingLinksHeloer('0', '/news/help-41670342');
    cy.footerTestWorkingLinksHeloer('1', '/terms');
    cy.footerTestWorkingLinksHeloer('2', '/aboutthebbc/');
    cy.footerTestWorkingLinksHeloer('3', '/privacy/');
    cy.footerTestWorkingLinksHeloer('4', '/usingthebbc/cookies/');
    cy.footerTestWorkingLinksHeloer('5', '/accessibility/');
    cy.footerTestWorkingLinksHeloer('6', '/contact/');
  });
});

Cypress.Commands.add('footerTestCopyrightLink', () => {
  cy.get('footer a')
    .eq(0)
    .should('contain', 'BBC News');
});

Cypress.Commands.add('hasScriptToFetchBundle', () => {
  // Testing the actual fetch is not currently possible
  cy.get('script')
    .last()
    .should('have.attr', 'src')
    .and('match', /(\/static\/js\/main-\w+\.\w+\.js)/g);
});

Cypress.Commands.add('hasVisibleSectionLabel', () => {
  cy.get('section')
    .should('have.length.of.at.least', 1)
    .should('be.visible')
    .each($section => {
      cy.wrap($section).within(() => {
        cy.get('h2').should('have.lengthOf', 1);
      });
    });
});

Cypress.Commands.add('hasOneOrMoreStoryPromos', () => {
  cy.get('section').within(() => {
    cy.get('img')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
    cy.get('h3')
      .should('have.length.of.at.least', 1)
      .should('be.visible')
      .find('a')
      .should('have.attr', 'href');
    cy.get('p')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
    cy.get('time')
      .should('have.length.of.at.least', 1)
      .should('be.visible');
  });
});
