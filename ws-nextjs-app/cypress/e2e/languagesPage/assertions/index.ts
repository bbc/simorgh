import { LanguagesPageProps } from '../../../../pages/ws/types';

export const assertWSLanguagesPageURNLive = () => {
  it('should render the WS Languages Page with correct URN in Live', () => {
    cy.getPageDataFromWindow().then(pageData => {
      const urn = (pageData as LanguagesPageProps['pageData'])?.metadata
        ?.atiAnalytics?.contentId;
      expect(urn).to.equal('urn:bbc:tipo:topic:c1le13lzd2qt');
    });
  });
};

export const assertWSLanguagesPageLocal = () => {
  it('should render the Languages Page with fixture content', () => {
    cy.contains('Youtube - BBC News').should('exist');
  });
};

export const assertWSLanguagesPageURN = () => {
  it('should render the WS Languages Page with correct URN in test', () => {
    cy.getPageDataFromWindow().then(pageData => {
      const urn = (pageData as LanguagesPageProps['pageData'])?.metadata
        ?.atiAnalytics?.contentId;
      expect(urn).to.equal('urn:bbc:tipo:topic:c6jdzrejj3p3t');
    });
  });
};
