import config from '../../support/config/services';
import envConfig from '../../support/config/envs';
import appConfig from '../../../src/app/lib/config/services';
import describeForEuOnly from '../../support/describeForEuOnly';
import toggles from '../../support/toggles';

export const runCommonCanonicalTests = ({ service, pageType }) => {
  if (pageType !== 'errorPage404') {
    describe('Scripts', () => {
      it('should only have expected bundle script tags', () => {
        cy.get('script[src]').each($p => {
          if ($p.attr('src').includes(envConfig.assetOrigin)) {
            return expect($p.attr('src')).to.match(
              new RegExp(
                `(\\/static\\/js\\/(main|vendor|${service})-\\w+\\.\\w+\\.js)`,
                'g',
              ),
            );
          }
          return null;
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
  }
};

export const runCommonTests = ({ service, pageType }) => {
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
          cy.get('head link[rel="canonical"]').should(
            'have.attr',
            'href',
            `https://www.bbc.com${config[service].pageTypes[pageType].path}`,
          );
        });

        it('should have a correct robot meta tag', () => {
          cy.get('head meta[name="robots"]').should(
            'have.attr',
            'content',
            'noodp,noydir',
          );
        });

        it('should have lang attribute matching payload data', () => {
          cy.request(`${config[service].pageTypes[pageType].path}.json`).then(
            ({ body }) => {
              const lang =
                pageType === 'articles'
                  ? body.metadata.passport.language
                  : appConfig[service].lang;

              cy.hasHtmlLangAttribute({
                lang,
              });
            },
          );
        });

        it('should have the correct shared social media metadata', () => {
          cy.checkSharedSocialmediaMetadata({
            fbAdmins: '100004154058350',
            appID: '1609039196070050',
          });
        });
      }

      it('should have dir matching service config', () => {
        cy.get('html').and('have.attr', 'dir', appConfig[service].dir);
      });
    });

    describeForEuOnly('Consent Banners', () => {
      it('have correct translations', () => {
        cy.contains(
          appConfig[service].translations.consentBanner.privacy.title,
        );
        cy.contains(
          appConfig[service].translations.consentBanner.privacy.reject,
        );
        cy.contains(
          appConfig[service].translations.consentBanner.privacy.accept,
        ).click();
        cy.contains(appConfig[service].translations.consentBanner.cookie.title);
        cy.contains(
          appConfig[service].translations.consentBanner.cookie.reject,
        );
        cy.contains(
          appConfig[service].translations.consentBanner.cookie.accept,
        );
      });
    });

    // Should be made to not be a smoke test
    describe('Page links test', () => {
      if (Cypress.env('APP_ENV') === 'live') {
        it('links should not 404', () => {
          cy.get('a')
            .not('[href="#*"]')
            .each(element => {
              const href = element.attr('href');
              cy.request(href).then(resp => {
                expect(resp.status).to.not.equal(404);
              });
            });
        });
      }
    });

    describe('Header Tests', () => {
      it('should render the BBC News branding', () => {
        cy.get('header a').should(
          'contain',
          appConfig[service].serviceLocalizedName !== undefined
            ? `${appConfig[service].product}, ${appConfig[service].serviceLocalizedName}`
            : appConfig[service].product,
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

      if (appConfig[service].navigation) {
        if (
          pageType !== 'articles' ||
          (pageType === 'articles' && toggles.navOnArticles.enabled)
        ) {
          it('should have one visible navigation with a skiplink to h1', () => {
            cy.get('nav')
              .should('have.lengthOf', 1)
              .should('be.visible')
              .find('a[class^="SkipLink"]')
              .should('have.lengthOf', 1)
              .should('have.attr', 'href', '#content');
            cy.get('nav a[class^="StyledLink"]')
              .should('have.attr', 'href', appConfig[service].navigation[0].url)
              .should('contain', appConfig[service].navigation[0].title);
            cy.get('h1')
              .should('have.lengthOf', 1)
              .should('have.attr', 'id', 'content');
          });
        }
      }
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
            appConfig[service].serviceLocalizedName !== undefined
              ? `${appConfig[service].product}, ${appConfig[service].serviceLocalizedName}`
              : appConfig[service].product,
          );
      });

      it('should have working links', () => {
        cy.get('footer ul').within(() =>
          appConfig[service].footer.links.forEach(({ href }, key) =>
            cy.checkLinks(key, href),
          ),
        );
      });

      it('should contain copyright text', () => {
        cy.get('footer p').should(
          'contain',
          appConfig[service].footer.copyrightText,
        );
      });

      it('copyright symbol should be wrapped in span', () => {
        cy.get('footer span').should('contain', '©');
      });

      it('should contain a link in the copyright text', () => {
        cy.get('footer p')
          .children('a')
          .should('have.attr', 'href')
          .and('contain', appConfig[service].footer.externalLink.href);
      });
    });
  });
};
