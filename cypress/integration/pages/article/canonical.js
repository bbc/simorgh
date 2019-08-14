import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';

// TODO: Remove after https://github.com/bbc/simorgh/issues/2959
const serviceHasFigure = service =>
  ['arabic', 'news', 'pashto', 'persian', 'urdu'].includes(service);
const serviceHasCaption = service => ['news', 'persian'].includes(service);
// TODO: Remove after https://github.com/bbc/simorgh/issues/2962
const serviceHasCorrectlyRenderedParagraphs = service => service !== 'sinhala';

const serviceHasArticlePageType = service =>
  config[service].pageTypes.articles.path !== undefined;

Object.keys(config)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`Article - Canonical - ${service}`, () => {
      before(() => {
        cy.visit(config[service].pageTypes.articles.path);
      });

      describe(`Meta Tests`, () => {
        it('should have the correct lang & dir attributes', () => {
          cy.window().then(win => {
            cy.hasHtmlLangDirAttributes({
              lang: `${win.SIMORGH_DATA.pageData.metadata.passport.language}`,
              dir: `${appConfig[service].dir}`,
            });
          });
        });

        it('should not have an AMP attribute on the main article', () => {
          cy.get('html').should('not.have.attr', 'amp');
        });

        it('should have a correct robot meta tag', () => {
          cy.checkMetadataContent('head meta[name="robots"]', 'noodp,noydir');
        });

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

        it('should have the correct facebook metadata', () => {
          cy.checkFacebookMetadata(
            '100004154058350',
            '1609039196070050',
            `${appConfig[service].articleAuthor}`,
          );
        });

        it('should have the correct open graph metadata', () => {
          cy.checkOpenGraphMetadata(
            'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
            `${appConfig[service].defaultImage}`,
            `${appConfig[service].defaultImageAltText}`,
            `${appConfig[service].locale}`,
            `${appConfig[service].defaultImageAltText}`,
            "Meghan's bouquet laid on tomb of unknown warrior",
            'article',
            `https://www.bbc.com${config[service].pageTypes.articles.path}`,
          );
        });

        it('should have the correct twitter metadata', () => {
          cy.checkTwitterMetadata(
            'summary_large_image',
            `${appConfig[service].twitterCreator}`,
            'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
            `${appConfig[service].defaultImageAltText}`,
            `${appConfig[service].defaultImage}`,
            `${appConfig[service].twitterSite}`,
            "Meghan's bouquet laid on tomb of unknown warrior",
          );
        });

        it('should include metadata that matches the JSON data', () => {
          cy.window().then(win => {
            cy.get('head').within(() => {
              cy.get('meta[name="description"]').should(
                'have.attr',
                'content',
                win.SIMORGH_DATA.pageData.promo.summary ||
                  win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
              );
              cy.get('meta[name="og:title"]').should(
                'have.attr',
                'content',
                win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
              );
              cy.get('meta[name="og:type"]').should(
                'have.attr',
                'content',
                win.SIMORGH_DATA.pageData.metadata.type,
              );
              cy.get('meta[name="article:published_time"]').should(
                'have.attr',
                'content',
                new Date(
                  win.SIMORGH_DATA.pageData.metadata.firstPublished,
                ).toISOString(),
              );
              cy.get('meta[name="article:modified_time"]').should(
                'have.attr',
                'content',
                new Date(
                  win.SIMORGH_DATA.pageData.metadata.lastPublished,
                ).toISOString(),
              );
            });

            cy.get('html').should(
              'have.attr',
              'lang',
              win.SIMORGH_DATA.pageData.metadata.passport.language,
            );
          });
        });

        it('should include the canonical URL & ampHTML', () => {
          cy.checkCanonicalURL(
            `https://www.bbc.com${config[service].pageTypes.articles.path}`,
          );
          cy.checkAmpHTML(
            `${window.location.origin}${config[service].pageTypes.articles.path}.amp`,
          );
        });

        it('should include mainEntityOfPage in the LinkedData', () => {
          cy.get('script[type="application/ld+json"]')
            .should('contain', 'mainEntityOfPage')
            .and('contain', 'author')
            .and('contain', 'headline');
        });
      });

      describe('Footer Tests', () => {
        it('should render the BBC News branding', () => {
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
            `© ${new Date().getFullYear()} ${
              appConfig[service].footer.copyrightText
            }`,
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

      describe('ATI', () => {
        it('should have a noscript tag with an 1px image with the ati url', () => {
          cy.hasNoscriptImgAtiUrl(
            envConfig.atiUrl,
            config[service].isWorldService
              ? envConfig.atiAnalyticsWSBucket
              : '',
          );
        });
      });

      describe('Chartbeat', () => {
        if (envConfig.chartbeatEnabled) {
          it('should have a script with src value set to chartbeat source', () => {
            cy.hasScriptWithChartbeatSrc();
          });
          it('should have chartbeat config set to window object', () => {
            cy.hasGlobalChartbeatConfig();
          });
        }
      });

      describe('Consent Banners', () => {
        it('have correct translations', () => {
          cy.hasConsentBannerTranslations(service);
        });
      });

      describe('Scripts', () => {
        it('should only have expected bundle script tags', () => {
          cy.hasExpectedJsBundles(envConfig.assetOrigin, service);
        });

        it('should have 1 bundle for its service', () => {
          cy.hasOneServiceBundle(service);
        });
      });

      describe(`Article Body`, () => {
        it('should render the BBC News branding', () => {
          cy.get('header a').should(
            'contain',
            appConfig[service].serviceLocalizedName !== undefined
              ? `${appConfig[service].product}, ${appConfig[service].serviceLocalizedName}`
              : appConfig[service].product,
          );
        });

        it('should render a H1, which contains/displays a styled headline', () => {
          cy.firstHeadlineDataWindow();
        });

        it('should render a formatted timestamp', () => {
          cy.window().then(win => {
            if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
              const { lastPublished } = win.SIMORGH_DATA.pageData.metadata;
              const timestamp = Cypress.moment(lastPublished).format(
                'D MMMM YYYY',
              );
              cy.get('time').should('contain', timestamp);
            }
          });
        });

        it('should render an H2, which contains/displays a styled subheading', () => {
          cy.window().then(win => {
            if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
              cy.firstSubheadlineDataWindow();
            }
          });
        });

        it('should render a paragraph, which contains/displays styled text', () => {
          if (serviceHasCorrectlyRenderedParagraphs(service)) {
            cy.firstParagraphDataWindow();
          }
        });

        if (serviceHasFigure(service)) {
          it('should have a placeholder image', () => {
            cy.get('figure div div div')
              .eq(0)
              .should(el => {
                expect(el).to.have.css(
                  'background-image',
                  `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
                );
              });
          });

          if (serviceHasCaption(service)) {
            it('should have a visible image without a caption, and also not be lazyloaded', () => {
              cy.get('figure')
                .eq(0)
                .should('be.visible')
                .should('to.have.descendants', 'img')
                .should('not.to.have.descendants', 'figcaption')
                .within(() => cy.get('noscript').should('not.exist'));
            });

            it('should have a visible image with a caption that is lazyloaded and has a noscript fallback image', () => {
              cy.get('figure')
                .eq(2)
                .within(() => {
                  cy.get('div div div div').should(
                    'have.class',
                    'lazyload-placeholder',
                  );
                })
                .scrollIntoView();

              cy.get('figure')
                .eq(2)
                .should('be.visible')
                .should('to.have.descendants', 'img')
                .should('to.have.descendants', 'figcaption')

                // NB: If this test starts failing unexpectedly it's a good sign that the dom is being
                // cleared during hydration. React won't render noscript tags on the client so if they
                // get cleared during hydration, the following render wont re-add them.
                // See https://github.com/facebook/react/issues/11423#issuecomment-341751071 or
                // https://github.com/bbc/simorgh/pull/1872 for more infomation.
                .within(() => {
                  cy.get('noscript').contains('<img ');
                  cy.get('div div').should(
                    'not.have.class',
                    'lazyload-placeholder',
                  );
                });
            });
          }

          it('should have an image copyright label with styling', () => {
            cy.copyrightDataWindow();
          });
        }

        it('should render a title', () => {
          cy.window().then(win => {
            const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
            cy.renderedTitle(
              `${seoHeadline} - ${appConfig[service].brandName}`,
            );
          });
        });

        it('should have an inline link', () => {
          cy.window().then(win => {
            if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
              cy.get('main a');
            }
          });
        });
      });
    });
  });
