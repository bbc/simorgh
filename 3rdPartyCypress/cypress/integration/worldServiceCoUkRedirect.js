import services from '../../../src/app/lib/config/services';

Object.keys(services).forEach(index => {
  const service = index;

  const notWSServices = ['news', 'cymrufyw', 'naidheachdan', 'default']; // Not WS

  if (notWSServices.includes(service)) {
    return;
  }
  describe('WS Redirects:', () => {
    it(`all routes should redirect for ${service}`, () => {
      const urlsTotest = [
        `https://www.bbc.co.uk/${service}`,
        `https://www.bbc.co.uk/${service}/articles/a00000000o`,
        `http://www.bbc.co.uk/${service}/articles/a00000000o`,
        `https://www.bbc.co.uk/${service}/articles/a00000000o.amp`,
        `http://www.bbc.co.uk/${service}/articles/a00000000o.amp`,
      ];

      urlsTotest.forEach(urlToTest => {
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
            urlToTest.substring(22),
          );
        });
      });
    });
  });
});
