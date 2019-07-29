import { getBlockByType, getBlockData } from '../../bodyTestHelper';

Cypress.Commands.add('firstHeadlineDataWindow', () => {
  cy.window().then(win => {
    const headlineData = getBlockData('headline', win);
    cy.get('h1').should(
      'contain',
      headlineData.model.blocks[0].model.blocks[0].model.text,
    );
  });
});

Cypress.Commands.add('firstSubheadlineDataWindow', () => {
  cy.window().then(win => {
    const subheadingData = getBlockData('subheadline', win);
    cy.get('h2').should(
      'contain',
      subheadingData.model.blocks[0].model.blocks[0].model.text,
    );
  });
});

Cypress.Commands.add('firstParagraphDataWindow', () => {
  cy.window().then(win => {
    const paragraphData = getBlockData('text', win);
    const { text } = paragraphData.model.blocks[0].model;

    cy.get('p').should('contain', text);
  });
});

Cypress.Commands.add('copyrightDataWindow', () => {
  cy.window().then(win => {
    const copyrightData = getBlockData('image', win);
    const rawImageblock = getBlockByType(
      copyrightData.model.blocks,
      'rawImage',
    );
    const { copyrightHolder } = rawImageblock.model;

    cy.get('figure p')
      .eq(0)
      .should('contain', copyrightHolder);
  });
});

Cypress.Commands.add('renderedTitle', title => {
  cy.title().should('eq', title);
});

Cypress.Commands.add(
  'worldServiceCookieBannerTranslations ',
  (
    privacyStatement,
    performanceStatement,
    service,
    cookieAgreement,
    privacyAgreement,
  ) => {
    const getPrivacyBanner = () => cy.contains(privacyStatement);

    const getCookieBanner = () => cy.contains(performanceStatement);
    const getPrivacyBannerContainer = () => getPrivacyBanner().parent();
    const getCookieBannerContainer = () => getCookieBanner().parent();

    const visitArticle = () => {
      cy.visit(service, {
        failOnStatusCode: false,
      });
    };

    cy.clearCookies();
    visitArticle();

    getPrivacyBanner().should('be.visible');
    getCookieBanner().should('not.be.visible');

    getPrivacyBannerContainer()
      .contains(cookieAgreement)
      .click();

    getCookieBanner().should('be.visible');
    getPrivacyBanner().should('not.be.visible');

    getCookieBannerContainer()
      .contains(privacyAgreement)
      .click();

    getCookieBanner().should('not.be.visible');
    getPrivacyBanner().should('not.be.visible');
  },
);

Cypress.Commands.add('hasHtmlLangDirAttributes', ({ lang, dir }) => {
  cy.get('html')
    .should('have.attr', 'lang', lang)
    .and('have.attr', 'dir', dir);
});
