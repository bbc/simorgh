import {
  testNonHTMLResponseCode,
  testContentType,
} from '../support/metaTestHelper';

describe('Simorgh Status', () => {
  it('should return 200', () => {
    testNonHTMLResponseCode('/status', 200);
  });

    it('should return the correct service worker for the env', () => {
    const response = cy.request('/news/articles/c9rpqy7pmypo').then(({ response }) => {
    console.log(response)
    expect(response).to.include('sw-local.js');
    });
  });

  it('should have the content type set to Javascript', () => {
    testContentType(
      '/news/articles/sw.js',
      'application/javascript; charset=UTF-8',
    );
  });
});
    it('should do a thing', () => {
    //   // const request = cy.request('/news/articles/c9rpqy7pmypo', 'headers');
    //   //   console.log(request)
    //   // // expect(request.categoryId).to.not.be.null
    //   // });
      cy.visit('/news/articles/c9rpqy7pmypo');
      const script = cy.get('script');
      console.log(script);
    });


