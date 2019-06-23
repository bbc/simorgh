import config from '../support/config';
import { describeForLocalOnly } from '../support/limitEnvRuns';

const bundleRegex = name =>
  new RegExp(`(\\/static\\/js\\/${name}-\\w+\\.\\w+\\.js)`, 'g');

const getMatchCount = (regex, arr) => arr.filter(i => i.match(regex)).length;

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
      cy.get('script').should($p => {
        const srcs = [];

        for (let x = 0; x < $p.length; x += 1) {
          const src = Cypress.$($p[x]).attr('src');

          if (src) {
            srcs.push(src);
          }
        }

        const mainMatchCount = getMatchCount(bundleRegex('main'), srcs);
        const vendorMatchCount = getMatchCount(bundleRegex('vendor'), srcs);
        const serviceMatchCount = getMatchCount(bundleRegex(service), srcs);

        expect(mainMatchCount + vendorMatchCount + serviceMatchCount).to.equal(
          srcs.length,
        );

        expect(serviceMatchCount).to.be.greaterThan(0);
      });
    });
  });
});
