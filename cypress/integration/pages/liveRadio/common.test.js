import path from 'ramda/src/path';
import appConfig from '../../../../src/app/lib/config/services';
import { getLiveRadioUrl } from '../../../support/getPageTypeUrl';

export default ({ service }) => {
  describe('Live Radio body', () => {
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

  // will be addressed by https://github.com/bbc/simorgh/issues/2750
  xdescribe('Metadata', () => {
    it('should have the correct lang & dir attributes', () => {
      cy.window().then(win => {
        cy.hasHtmlLangDirAttributes({
          lang: `${win.SIMORGH_DATA.pageData.metadata.language}`,
          dir: `${appConfig[service].dir}`,
        });
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
        `https://www.bbc.com${getLiveRadioUrl(service)}`,
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
        });
        cy.get('html').should(
          'have.attr',
          'lang',
          win.SIMORGH_DATA.pageData.metadata.passport.language,
        );
      });
    });

    // will be addressed by this https://github.com/bbc/simorgh/issues/3117
    xit('should include mainEntityOfPage in the LinkedData', () => {
      cy.get('script[type="application/ld+json"]')
        .should('contain', 'mainEntityOfPage')
        .and('contain', 'headline');
    });
  });
};
