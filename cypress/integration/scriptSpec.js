import config from '../support/config';
import { describeForLocalOnly } from '../support/limitEnvRuns';
import scriptMatches from '../support/scriptMatches';

const services = [
  { service: 'news', url: `/news/articles/${config.assets.news}`, describe },
  {
    service: 'persian',
    url: `/persian/articles/${config.assets.persian}`,
    describe: describeForLocalOnly,
  },
  { service: 'igbo', url: `/igbo`, describe: describeForLocalOnly },
  { service: 'yoruba', url: `/yoruba`, describe: describeForLocalOnly },
  { service: 'pidgin', url: `/pidgin`, describe: describeForLocalOnly },
];

services.forEach(({ service, url, describe }) => {
  describe(`Script src - ${service}`, () => {
    // eslint-disable-next-line no-undef
    before(() => {
      cy.visit(url);
    });

    // Testing the actual fetch is not currently possible
    it('should have script srcs for service', () => {
      let expectedMatches = scriptMatches(service);

      cy.get('script').should($p => {
        const srcs = [];

        for (let x = 0; x < $p.length; x += 1) {
          const src = Cypress.$($p[x]).attr('src');

          if (src) {
            srcs.push(src);
          }
        }

        // filter out all regexes that have a match in srcs array
        expectedMatches = expectedMatches.filter(regex => {
          const matches = srcs.filter(src => src.match(regex));
          return matches.length === 0;
        });

        // expect no regexes to be left after all have been met
        expect(expectedMatches).to.be.empty; // eslint-disable-line no-unused-expressions
      });
    });
  });
});
