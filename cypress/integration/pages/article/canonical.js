import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import envConfig from '../../../support/config/envs';
import config from '../../../support/config/services';
import testData from '../../../../src/app/lib/config/services';

const serviceHasArticlePageType = service =>
  config[service].pageTypes.articles !== undefined;

Object.keys(config)
  .filter(serviceHasArticlePageType)
  .forEach(service => {
    describe(`Article - Canonical - ${service}`, () => {
      // eslint-disable-next-line no-undef
      before(() => {
        cy.visit(config[service].pageTypes.articles);
      });

      describe(`Meta Tests`, () => {
        it('should have the correct lang & dir attributes', () => {
          cy.hasHtmlLangDirAttributes({
            lang: `${testData[service].datetimeLocale}`,
            dir: `${testData[service].dir}`,
          });
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
            `${testData[service].articleAuthor}`,
          );
        });

        it('should have the correct open graph metadata', () => {
          cy.checkOpenGraphMetadata(
            'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
            `${testData[service].defaultImage}`,
            `${testData[service].defaultImageAltText}`,
            `${testData[service].locale}`,
            `${testData[service].defaultImageAltText}`,
            "Meghan's bouquet laid on tomb of unknown warrior",
            'article',
            `https://www.bbc.com${config[service].pageTypes.articles}`,
          );
        });

        it('should have the correct twitter metadata', () => {
          cy.checkTwitterMetadata(
            'summary_large_image',
            `${testData[service].twitterCreator}`,
            'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
            `${testData[service].defaultImageAltText}`,
            `${testData[service].defaultImage}`,
            `${testData[service].twitterSite}`,
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
            `https://www.bbc.com${config[service].pageTypes.articles}`,
          );
          cy.checkAmpHTML(
            `${window.location.origin}${config[service].pageTypes.articles}.amp`,
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
            .should('contain', 'BBC News');
          // TODO - Assert `, igbo`
        });

        it('should have working links', () => {
          cy.get('footer ul').within(() =>
            testData[service].footer.links.forEach(({ href }, key) =>
              cy.checkLinks(key, href),
            ),
          );
        });

        it('should contain copyright text', () => {
          cy.get('footer p').should(
            'contain',
            `© ${new Date().getFullYear()} ${
              testData[service].footer.copyrightText
            }`,
          );
        });
        it('should contain a link in the copyright text', () => {
          cy.get('footer p')
            .children('a')
            .should('have.attr', 'href')
            .and('contain', testData[service].footer.externalLink.href);
        });
      });

      describe(`Article Body`, () => {
        it('should render the BBC News branding', () => {
          cy.get('header a').should('contain', 'BBC News');
          // TODO - Assert `, igbo`
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
          cy.firstParagraphDataWindow();
        });

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

        it('should have an image copyright label with styling', () => {
          cy.copyrightDataWindow();
        });

        it('should render a title', () => {
          cy.window().then(win => {
            const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
            if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
              cy.renderedTitle(`${seoHeadline} - BBC News`);
            } else {
              cy.renderedTitle(`${seoHeadline} - BBC News فارسی`);
            }
          });
        });

        it('should have an inline link', () => {
          cy.window().then(win => {
            if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
              cy.get('main a');
            }
          });
        });

        // it('should have a working first inline link', () => {
        //   cy.get('main a').click();
        //   cy.url().should(
        //     'contain',
        //     `/news/articles/${config.news.pageTypes.articles}`,
        //   );
        //   cy.get('header a').should('contain', 'BBC News');
        // });

        // This test is commented out because we are unable to run it on TEST as it requires a cert in order to work.
      });
    });
  });
