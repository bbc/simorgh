import services from '../../../src/app/lib/config/services';
import {
  ukBasePath,
  ukBasePathTest,
  basePath,
  basePathTest,
} from '../support/env';

Object.keys(services).forEach(service => {
  const notWSServices = ['news', 'cymrufyw', 'naidheachdan', 'default']; // Not WS

  if (notWSServices.includes(service)) {
    return;
  }

  // Do not run the redirect tests on the local environment
  if (Cypress.env('APP_ENV') === 'local') {
    return;
  }

  describe('WS Redirects', () => {
    it(`should redirect *bbc.com/${service}`, () => {
      let urlsTotest = [
        `${ukBasePathTest}${service}`,
        `${ukBasePathTest}${service}/articles/a0000000000o`,
        `${ukBasePathTest}${service}/articles/a0000000000o.amp`,
      ];
      let redirectTo = basePathTest;
      let substringCharCount = 25;

      if (Cypress.env('APP_ENV') === 'live') {
        urlsTotest = [
          `${ukBasePath}${service}`,
          `${ukBasePath}${service}/articles/a0000000000o`,
          `${ukBasePath}${service}/articles/a0000000000o.amp`,
        ];
        redirectTo = basePath;
        substringCharCount = 20;
      }

      urlsTotest.forEach(urlToTest => {
        const slashLoc = urlToTest.indexOf('/', 8);
        cy.request({
          url: urlToTest,
          followRedirect: false,
        }).then(resp => {
          expect(resp.status).to.eq(301);
          // expect first slice to equal https://www.bbc.com/
          expect(resp.redirectedToUrl.substring(0, substringCharCount)).to.eq(
            redirectTo,
          );
          // expect second slice to equal whatever came in
          expect(resp.redirectedToUrl.substring(substringCharCount)).to.eq(
            urlToTest.substring(slashLoc + 1),
          );
        });
      });
    });
  });
});
