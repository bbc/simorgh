describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
    // uncollapse all stories (first is open by default)
    cy.get('ul>li>div>ul>li:not(:first-child)').each(($story) => {
      cy.wrap($story).click()
    })
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });

  it('each story render panel should not be blank', () => {
    cy.get('ul>li>a').each(($a) => {
      cy.wrap($a).click()
      cy.get('#storybook-preview-iframe').then(($iframe) => {
        // .sb-show-main is the class of the storybook display panel
        const $body = $iframe.contents().find('body.sb-show-main')
        cy.wrap($body).children().should('exist')
      });
    })
  });
});
