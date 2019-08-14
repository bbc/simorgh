// import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';
import path from 'ramda/src/path';
import envConfig from '../../../support/config/envs';
import servicesConfig from '../../../support/config/services';
import appConfig from '../../../../src/app/lib/config/services';
import { hasLiveRadioPage } from '../../../support/serviceHasPageType';
import { getLiveRadioUrl } from '../../../support/getPageTypeUrl';

const runTests = service => {
  describe(`Live Radio - Canonical - ${service}`, () => {
    before(() => {
      cy.visit(getLiveRadioUrl(service));
    });

    // will be addressed by https://github.com/bbc/simorgh/issues/2750
    // describe('Meta Tests', () => {
    //   it('should have the correct lang & dir attributes', () => {
    //     cy.window().then(win => {
    //       cy.hasHtmlLangDirAttributes({
    //         lang: `${win.SIMORGH_DATA.pageData.metadata.language}`,
    //         dir: `${appConfig[service].dir}`,
    //       });
    //     });
    //   });

    //   it('should not have an AMP attribute on the main article', () => {
    //     cy.get('html').should('not.have.attr', 'amp');
    //   });

    //   it('should have a correct robot meta tag', () => {
    //     cy.checkMetadataContent('head meta[name="robots"]', 'noodp,noydir');
    //   });

    //   it('should have resource hints', () => {
    //     const resources = [
    //       envConfig.assetOrigin,
    //       'https://ichef.bbci.co.uk',
    //       'https://gel.files.bbci.co.uk',
    //     ];

    //     resources.forEach(resource => {
    //       const selector = `head link[href="${resource}"]`;
    //       cy.get(selector).should('have.attr', 'rel', 'preconnect');
    //       cy.get(selector)
    //         .eq(1)
    //         .should('have.attr', 'rel', 'dns-prefetch');
    //     });
    //   });

    //   it('should have the correct facebook metadata', () => {
    //     cy.checkFacebookMetadata(
    //       '100004154058350',
    //       '1609039196070050',
    //       `${appConfig[service].articleAuthor}`,
    //     );
    //   });

    //   it('should have the correct open graph metadata', () => {
    //     cy.checkOpenGraphMetadata(
    //       'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    //       `${appConfig[service].defaultImage}`,
    //       `${appConfig[service].defaultImageAltText}`,
    //       `${appConfig[service].locale}`,
    //       `${appConfig[service].defaultImageAltText}`,
    //       "Meghan's bouquet laid on tomb of unknown warrior",
    //       'article',
    //       `https://www.bbc.com${getLiveRadioUrl(service)}`,
    //     );
    //   });

    //   it('should have the correct twitter metadata', () => {
    //     cy.checkTwitterMetadata(
    //       'summary_large_image',
    //       `${appConfig[service].twitterCreator}`,
    //       'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    //       `${appConfig[service].defaultImageAltText}`,
    //       `${appConfig[service].defaultImage}`,
    //       `${appConfig[service].twitterSite}`,
    //       "Meghan's bouquet laid on tomb of unknown warrior",
    //     );
    //   });

    //   it('should include metadata that matches the JSON data', () => {
    //     cy.window().then(win => {
    //       cy.get('head').within(() => {
    //         cy.get('meta[name="description"]').should(
    //           'have.attr',
    //           'content',
    //           win.SIMORGH_DATA.pageData.promo.summary ||
    //             win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
    //         );
    //         cy.get('meta[name="og:title"]').should(
    //           'have.attr',
    //           'content',
    //           win.SIMORGH_DATA.pageData.promo.headlines.seoHeadline,
    //         );
    //         cy.get('meta[name="og:type"]').should(
    //           'have.attr',
    //           'content',
    //           win.SIMORGH_DATA.pageData.metadata.type,
    //         );
    //         cy.get('meta[name="article:published_time"]').should(
    //           'have.attr',
    //           'content',
    //           new Date(
    //             win.SIMORGH_DATA.pageData.metadata.firstPublished,
    //           ).toISOString(),
    //         );
    //         cy.get('meta[name="article:modified_time"]').should(
    //           'have.attr',
    //           'content',
    //           new Date(
    //             win.SIMORGH_DATA.pageData.metadata.lastPublished,
    //           ).toISOString(),
    //         );
    //       });

    //       cy.get('html').should(
    //         'have.attr',
    //         'lang',
    //         win.SIMORGH_DATA.pageData.metadata.passport.language,
    //       );
    //     });
    //   });

    //   it('should include the canonical URL & ampHTML', () => {
    //     cy.checkCanonicalURL(`https://www.bbc.com${getLiveRadioUrl(service)}`);
    //     cy.checkAmpHTML(
    //       `${window.location.origin}${getLiveRadioUrl(service)}.amp`,
    //     );
    //   });

    //   // will be addressed by this https://github.com/bbc/simorgh/issues/3117
    //   // it('should include mainEntityOfPage in the LinkedData', () => {
    //   //   cy.get('script[type="application/ld+json"]')
    //   //     .should('contain', 'mainEntityOfPage')
    //   //     .and('contain', 'headline');
    //   // });
    // });

    describe('header tests', () => {
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

      it('should not have an AMP attribute', () => {
        cy.get('html').should('not.have.attr', 'amp');
      });

      if (appConfig[service].navigation) {
        it('should have one visible navigation', () => {
          cy.get('nav')
            .should('have.lengthOf', 1)
            .should('be.visible');
        });
      }

      it('should have a visually hidden top-level header', () => {
        cy.get('h1').should('have.length', 1);
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

    // will be addressed by https://github.com/bbc/simorgh/pull/2971
    // describe('ATI', () => {
    //   it('should have a noscript tag with an 1px image with the ati url', () => {
    //     cy.hasNoscriptImgAtiUrl(
    //       envConfig.atiUrl,
    //       servicesConfig[service].isWorldService
    //         ? envConfig.atiAnalyticsWSBucket
    //         : '',
    //     );
    //   });
    // });

    // TODO Chartbeat not yet implemented
    // describe('Chartbeat', () => {
    //   if (envConfig.chartbeatEnabled) {
    //     it('should have a script with src value set to chartbeat source', () => {
    //       cy.hasScriptWithChartbeatSrc();
    //     });
    //     it('should have chartbeat config set to window object', () => {
    //       cy.hasGlobalChartbeatConfig();
    //     });
    //   }
    // });

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

    describe('Live Radio body', () => {
      it('should render the BBC News branding', () => {
        cy.get('header a').should(
          'contain',
          appConfig[service].serviceLocalizedName !== undefined
            ? `${appConfig[service].product}, ${appConfig[service].serviceLocalizedName}`
            : appConfig[service].product,
        );
      });

      it('should render a H1, which contains/displays a styled headline', () => {
        cy.window().then(win => {
          const [{ text: headline }] = path(
            ['SIMORGH_DATA', 'pageData', 'content', 'blocks'],
            win,
          );
          cy.get('h1').should('contain', headline);
        });
      });

      it('should render an H2, which contains/displays a styled subheading', () => {
        cy.window().then(win => {
          if (win.SIMORGH_DATA.pageData.metadata.language === 'en-gb') {
            cy.firstSubheadlineDataWindow();
          }
        });
      });

      it('should render a title', () => {
        cy.window().then(win => {
          const { seoHeadline } = win.SIMORGH_DATA.pageData.promo.headlines;
          cy.renderedTitle(`${seoHeadline} - ${appConfig[service].brandName}`);
        });
      });
    });
  });
};

Object.keys(servicesConfig)
  .filter(hasLiveRadioPage)
  .forEach(runTests);
