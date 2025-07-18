export const assertWSLanguagesPage = () => {
  it('should render the WS Languages Page', () => {
    cy.get('h1').should('have.text', 'Get the news in your language');
  });
};

export const assertWSLanguagesPageLocal = () => {
  it('should render the Languages Page with fixture content', () => {
    cy.contains('BBC World Service - global front page').should('exist');
  });
};

export const assertWSLanguagesPageURN = () => {
  it('should render the WS Languages Page with correct URN', () => {
    cy.window().then(win => {
      const windowData = (
        win as Window & { SIMORGH_DATA?: { pageData?: { urn?: string } } }
      ).SIMORGH_DATA;
      const pageData = windowData?.pageData;

      expect(pageData?.urn).to.equal('urn:bbc:tipo:topic:c6jdzrejj3p3t');
    });
  });
};
