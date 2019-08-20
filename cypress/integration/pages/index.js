import config from '../../support/config/services';
import envConfig from '../../support/config/envs';
import getAppConfig from '../../support/config/getAppConfig';
import describeForEuOnly from '../../support/describeForEuOnly';

const runCommonTests = ({ service, serviceVariantConfig, pageType }) => {
  const appConfiguration = getAppConfig({ service, serviceVariantConfig });
  describe('Always tests', () => {
    describe(`Metadata`, () => {
      it('should have resource hints', () => {
        const resources = [
          envConfig.assetOrigin,
          'https://ichef.bbci.co.uk',
          'https://gel.files.bbci.co.uk',
        ];

        resources.forEach(resource => {
          const selector = `head link[href="${resource}"]`;
          cy.get(selector).should('have.attr', 'rel', 'preconnect');
          cy.get(selector)
            .eq(1)
            .should('have.attr', 'rel', 'dns-prefetch');
        });
      });

      if (pageType !== 'errorPage404') {
        it('should include the canonical URL', () => {
          cy.checkCanonicalURL(
            `${envConfig.baseUrl}${config[service].pageTypes[pageType].path}`,
          );
        });

        it('should have a correct robot meta tag', () => {
          cy.checkMetadataContent('head meta[name="robots"]', 'noodp,noydir');
        });
      }
    });

    describeForEuOnly('Consent Banners', () => {
      it('have correct translations', () => {
        cy.hasConsentBannerTranslations(service, serviceVariantConfig);
      });
    });

    describe('Header Tests', () => {
      it('should render the BBC News branding', () => {
        cy.get('header a').should(
          'contain',
          appConfiguration.serviceLocalizedName !== undefined
            ? `${appConfiguration.product}, ${appConfiguration.serviceLocalizedName}`
            : appConfiguration.product,
        );
      });

      it('should have a visible banner', () => {
        cy.get('header')
          .should('have.lengthOf', 1)
          .find('div[class^="Banner"]')
          .children()
          .should('have.lengthOf', 1)
          .children()
          .should('have.attr', 'href', `/${service}`)
          .find('svg')
          .should('be.visible');
      });
    });

    describe('Footer Tests', () => {
      describe('footer tests', () => {
        it('should have a visible footer', () => {
          cy.get('footer')
            .should('have.length', 1)
            .should('have.attr', 'role', 'contentinfo')
            .find('a')
            .should('have.attr', 'href', `/${service}`)
            .find('svg')
            .should('be.visible');
        });
      });

      it('should render the BBC branding', () => {
        cy.get('footer a')
          .eq(0)
          .should(
            'contain',
            appConfiguration.serviceLocalizedName !== undefined
              ? `${appConfiguration.product}, ${appConfiguration.serviceLocalizedName}`
              : appConfiguration.product,
          );
      });

      it('should have working links', () => {
        cy.get('footer ul').within(() =>
          appConfiguration.footer.links.forEach(({ href }, key) =>
            cy.checkLinks(key, href),
          ),
        );
      });

      it('should contain copyright text', () => {
        cy.get('footer p').should(
          'contain',
          appConfiguration.footer.copyrightText,
        );
      });

      it('copyright symbol should be wrapped in span', () => {
        cy.get('footer span').should('contain', '©');
      });

      it('should contain a link in the copyright text', () => {
        cy.get('footer p')
          .children('a')
          .should('have.attr', 'href')
          .and('contain', appConfiguration.footer.externalLink.href);
      });
    });
  });
};

export default runCommonTests;
