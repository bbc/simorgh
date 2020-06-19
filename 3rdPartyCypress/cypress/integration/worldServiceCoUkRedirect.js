import services from '../../../src/server/utilities/serviceConfigs';

Object.keys(services).forEach(service => {
  const notWSServices = [
    'news',
    'cymrufyw',
    'naidheachdan',
    'default',
    'scotland',
    'archive', // not WS
    'serbian', // variant with redirect - test needs to be updated
    'ukchina', // variant with redirect - test needs to be updated
    'zhongwen', // variant with redirect - test needs to be updated
  ]; // Not WS

  if (notWSServices.includes(service)) {
    return;
  }

  // Do not run the redirect tests on the local environment
  if (Cypress.env('APP_ENV') !== 'live') {
    return;
  }

  describe('WS Redirects', () => {
    it(`should redirect to *bbc.com/${service}`, () => {
      const urlsTotest = [
        `https://www.bbc.co.uk/${service}`,
        `https://www.bbc.co.uk/${service}/articles/a0000000000o`,
        `https://www.bbc.co.uk/${service}/articles/a0000000000o.amp`,
      ];

      urlsTotest.forEach(urlToTest => {
        const slashLoc = urlToTest.indexOf('/', 8);
        cy.request({
          url: urlToTest,
          followRedirect: false,
        }).then(resp => {
          expect(resp.status).to.eq(301);
          // expect first slice to equal https://www.bbc.com/
          expect(resp.redirectedToUrl.substring(0, 20)).to.eq(
            'https://www.bbc.com/',
          );
          // expect second slice to equal whatever came in
          expect(resp.redirectedToUrl.substring(20)).to.eq(
            urlToTest.substring(slashLoc + 1),
          );
        });
      });
    });
  });
});
