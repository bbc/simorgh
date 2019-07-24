import config from '../support/config/services';
import { describeForLocalOnly } from '../support/limitEnvRuns';

Object.keys(config).forEach(service => {
  Object.keys(config[service].pageTypes)
    .filter(
      pageType =>
        config[service].pageTypes[pageType] !== undefined &&
        config[service].pageTypes[pageType].asset !== undefined,
    )
    .forEach(pageType => {
      describeForLocalOnly(`Script src - ${service} ${pageType}`, () => {
        beforeEach(() => {
          cy.visit(
            pageType === 'frontPage'
              ? `/${service}`
              : `/${service}/articles/${config[service].pageTypes.articles.asset}`,
          );
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
                  new RegExp(
                    `(\\/static\\/js\\/${service}-\\w+\\.\\w+\\.js)`,
                    'g',
                  ),
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
});
