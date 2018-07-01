describe('Storybook Article', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });

  // This is incredibly brittle, it only works if Article is first.
  it('article story should have a header', () => {
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $jroot = $iframe.contents().find('#root')
      const $root = $jroot[0]
      cy.wrap($root).find('header').should('exist')
    });
  });

  it('first story should have children', () => {
    cy.get('#storybook-preview-iframe').then(($iframe) => {
      const $jroot = $iframe.contents().find('#root')
      const $root = $jroot[0]
      cy.wrap($root).children().should('exist')
    });
  });

  it('each story should have children', () => {
    cy.get('ul>li>a').each(($el) => {
      cy.wrap($el).click();
      cy.get('#storybook-preview-iframe').then(($iframe) => {
        const $jroot = $iframe.contents().find('#root')
        const $root = $jroot[0]
        cy.wrap($root).children().should('exist')
      });
    })
  });

});
