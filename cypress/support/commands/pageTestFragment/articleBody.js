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

Cypress.Commands.add('hasHtmlLangDirAttributes', ({ lang, dir }) => {
  cy.get('html')
    .should('have.attr', 'lang', lang)
    .and('have.attr', 'dir', dir);
});

Cypress.Commands.add('getAndAssertLinks',tag => {
  cy.get(' tag a').each(element => {
    const href = element.attr('href')
    cy.request(href).then(resp => {
      expect(resp.status).to.not.equal(404);
    });
  });
});
