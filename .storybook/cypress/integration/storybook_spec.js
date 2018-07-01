describe('Storybook Article', () => {
  const fullArray = ['Article', 'Footer', 'Header', 'Headline', 'Image', 'MainContent', 'SubHeading', 'Text', 'Video'];
  fullArray.shift();
  const storyArray = fullArray;
  
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit('/');
    cy.wrap(storyArray).each((story) => {
      cy.contains(story).click()
    })
  });

  it('should render a title', () => {
    cy.title().should('eq', 'Storybook');
  });

  it('each story should have children', () => {
    cy.get('#storybook-preview-iframe').get('ul>li>a').each(($a) => {
      cy.wrap($a).click()
      cy.get('#storybook-preview-iframe').then(($iframe) => {
        const $jroot = $iframe.contents().find('#root')
        const $root = $jroot[0]
        cy.wrap($root).children().should('exist')
      });
    })
  });
  
});
