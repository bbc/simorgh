export const assertPidginHomepage = () => {
  cy.get('nav').should('exist');
  cy.get('main').should('exist');
  cy.get('h1').should('contain', 'BBC News, Pidgin, Home');
  cy.get('h1').should('not.have.text', 'Get the news in your language');
};

export const assertWSLanguagesPage = () => {
  cy.get('h1').should('have.text', 'Get the news in your language');
  cy.get('nav').should('exist');
  cy.get('main').should('exist');
};
