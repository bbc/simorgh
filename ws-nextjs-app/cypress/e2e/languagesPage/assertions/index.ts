import { LanguagesPageProps } from '../../../../pages/ws/types';

export const assertWSLanguagesPage = () => {
  it('should render the Languages Page', () => {
    cy.get('h1').should('contain.text', 'Get the news in your language');
  });
};

export const assertWSLanguagesPageLocal = () => {
  it('should render the Languages Page with fixture content', () => {
    cy.contains('Youtube - BBC News').should('exist');
  });
};

export const assertWSLanguagesPageURN = () => {
  it('should render the WS Languages Page with correct URN', () => {
    cy.getPageDataFromWindow().then(pageData => {
      const urn = (pageData as LanguagesPageProps['pageData'])?.metadata
        ?.atiAnalytics?.contentId;
      expect(urn).to.equal('urn:bbc:tipo:topic:c6jdzrejj3p3t');
    });
  });
};
