import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  describe(`Article Tests for ${service}`, () => {
    if (
      serviceConfig.pageTypes.articles !== undefined &&
      serviceConfig.pageTypes.articles.basicAsset !== undefined
    ) {
      // can refactor to use the visit below for increased speed?
      it(`should return a 200 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.pageTypes.articles.basicAsset}`,
          200,
          'text/html',
        );
      });

      if (serviceConfig.pageTypes.articles.featureFlags.dataEndpoint === true) {
        it(`should have an available data endpoint (200 response with a JSON file) for ${service}`, () => {
          cy.testResponseCodeAndType(
            `${serviceConfig.pageTypes.articles.basicAsset}.json`,
            200,
            'application/json',
          );
        });
      }

      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(`${serviceConfig.pageTypes.articles.basicAsset}`);
      });
      if (serviceConfig.pageTypes.articles.featureFlags.header === true) {
        it(`should render the header's BBC News branding for ${service}`, () => {
          cy.get('header a').should('contain', 'BBC News');
        });
      }

      if (serviceConfig.pageTypes.articles.featureFlags.footer === true) {
        it(`should render the footers's BBC News branding for ${service}`, () => {
          cy.get('footer a')
            .eq(0)
            .should('contain', 'BBC News');
        });

        it(`should have working links for ${service} in the footer`, () => {
          const checkFooterLinks = (position, url) => {
            cy.get('a')
              .eq(position)
              .should('have.attr', 'href')
              .and('contain', url);
          };

          cy.get('footer ul').within(() => {
            checkFooterLinks('0', '/news/help-41670342');
            checkFooterLinks('1', '/terms');
            checkFooterLinks('2', '/aboutthebbc/');
            checkFooterLinks('3', '/privacy/');
            checkFooterLinks('4', '/usingthebbc/cookies/');
            checkFooterLinks('5', '/accessibility/');
            checkFooterLinks('6', '/contact/');
          });
        });

        it(`should contain copyright text with a link in it for ${service} in the footer`, () => {
          cy.get('footer p')
            .should(
              'contain',
              `© ${new Date().getFullYear()} BBC. The BBC is not responsible for the content of external sites. `,
            )
            .children('a')
            .should('have.attr', 'href')
            .and('contain', '/help/web/links');
        });
      }
    }
  });
});
