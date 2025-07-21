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
    cy.getPageData({
      service: 'ws',
      pageType: 'home',
    }).then(pageData => {
      cy.log(pageData);
    });

    // cy.window().then(win => {
    //   const pageData = win?.SIMORGH_DATA;

    //   cy.log(`Full SIMORGH_DATA: ${JSON.stringify(win, null, 2)}`);

    //   const urn = pageData?.metadata?.atiAnalytics?.contentId;

    //   cy.log(`Extracted URN: ${urn}`);
    //   // expect(urn).to.equal('urn:bbc:tipo:topic:c6jdzrejj3p3t');
    // });
  });
};

// export const assertWSLanguagesPageURN = () => {
//   it('should render the WS Languages Page with correct URN', () => {
//     cy.document().then(doc => {
//       const nextDataScript = doc.getElementById('__NEXT_DATA__');
//       expect(nextDataScript).to.equal(true);

//       const json = JSON.parse(nextDataScript?.textContent || '{}');
//       const curationId =
//         json?.props?.pageProps?.metadata?.atiAnalytics?.curationId;

//       // cy.log(`Extracted curationId: ${curationId}`);
//     });
//   });
// };

export const assertWSLanguagesPageTitle = () => {
  it('should have the correct page title in window data', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.window().then(win => {
      const pageData = (win as any)?.getPageDataFromWindow?.(); // TODO: change to getPageData
      expect(pageData?.title).to.equal('BBC World Service - global front page');
    });
  });
};
