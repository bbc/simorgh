export const assertPidginHomepage = () => {
  it('should render the Pidgin Homepage', () => {
    cy.get('h1').should('have.text', 'BBC News, Pidgin - Home');
    cy.get('h1').should('not.have.text', 'Get the news in your language');
  });
};
export const assertWSLanguagesPage = () => {
  it('should render the Languages Page', () => {
    cy.get('h1').should('have.text', 'Get the news in your language');
  });
};
