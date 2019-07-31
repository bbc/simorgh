import config from '../support/config/services';

const host = 'http://localhost.bbc.com:7080';

const isJsBundle = url => url.includes(host);

Object.keys(config).forEach(service => {
  Object.keys(config[service].pageTypes)
    .filter(pageType => config[service].pageTypes[pageType] !== undefined)
    .forEach(pageType => {
      describe(`Script src - ${service} ${pageType}`, () => {
        beforeEach(() => {
          switch (pageType) {
            case 'frontPage':
              cy.visit(`/${service}`);
              break;
            case 'articles':
              cy.visit(
                `/${service}/articles/${config[service].pageTypes.articles.asset}`,
              );
              break;
            case 'errorPage404':
              cy.visit(
                `/${service}/articles/${config[service].pageTypes[pageType].asset}`,
                {
                  failOnStatusCode: false,
                },
              );
              break;
            default:
          }
        });

        it('should only have expected bundle script tags', () => {
          cy.get('script[src]').each($p => {
            if (isJsBundle($p.attr('src'))) {
              return expect($p.attr('src')).to.match(
                new RegExp(
                  `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
                  'g',
                ),
              );
            }
            return false;
          });
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
