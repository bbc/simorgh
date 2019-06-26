import config from '../support/config';
import { describeForLocalOnly } from '../support/limitEnvRuns';

[
  { service: 'news', url: `/news/articles/${config.assets.news}` },
  {
    service: 'persian',
    url: `/persian/articles/${config.assets.persian}`,
  },
  { service: 'igbo', url: `/igbo` },
  { service: 'yoruba', url: `/yoruba` },
  { service: 'pidgin', url: `/pidgin` },
].forEach(({ service, url }) => {
  describeForLocalOnly(`Script src - ${service}`, () => {
    beforeEach(() => {
      cy.visit(url);
    });

    it('should only have expected bundle script tags', () => {
      cy.get('script[src]').each($p =>
        expect($p.attr('src')).to.match(
          new RegExp(
            `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
            'g',
          ),
        ),
      );
    });

    it('should have 1 bundle for its service', () => {
      let matches = 0;

      cy.get('script[src]')
        .each($p => {
          const match = $p
            .attr('src')
            .match(
              new RegExp(`(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`, 'g'),
            );

          if (match) {
            matches += 1;
          }
        })
        .then(() => {
          expect(matches).to.equal(1);
        });
    });
  });
});
