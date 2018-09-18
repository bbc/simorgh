import {
  getElement,
  getSecondElement,
  metaDataTags,
} from '../support/testHelper';

describe('Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000025o');
  });

  it('should have a nofollow meta tag', () => {
    const metaElement = getElement('head meta[name="robots"]');
    metaElement.should('have.attr', 'content', 'nofollow');
  });

  it('should load a maximum of two Reith font files', () => {
    const fontFamiliesArray = [];
    cy.get('*')
      .each(element => {
        const fontFamily = Cypress.$(element).css('font-family');
        if (
          fontFamily &&
          !fontFamiliesArray.includes(fontFamily) &&
          fontFamily.startsWith('Reith')
        ) {
          fontFamiliesArray.push(fontFamily);
        }
      })
      .then(() => {
        expect(fontFamiliesArray.length).to.be.lessThan(3);
        expect(fontFamiliesArray.length).to.be.greaterThan(0);
      });
  });

  // Testing the actual fetch is not currently possible
  it('should have script to fetch bundle', () => {
    cy.get('script')
      .last()
      .should('have.attr', 'src')
      .and('match', /(\/static\/js\/client-\w+\.\w+\.js)/g);
  });

  it('should have resource hints', () => {
    const resources = [
      'https://ichef.bbci.co.uk',
      'https://static.bbci.co.uk',
      'https://gel.files.bbci.co.uk',
    ];

    resources.forEach(resource => {
      const selector = `head link[href="${resource}"]`;
      const firstElement = getElement(selector);
      firstElement.should('have.attr', 'rel', 'preconnect');
      const secondElement = getSecondElement(selector);
      secondElement.should('have.attr', 'rel', 'dns-prefetch');
    });
  });

  it('should have Facebook meta data', () => {
    metaDataTags(
      'head meta[name="article:author"]',
      'https://www.facebook.com/bbcnews',
    );
  });

  it('should have OpenGraph meta data', () => {
    metaDataTags(
      'head meta[name="og:description"]',
      'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    );
    metaDataTags(
      'head meta[name="og:image"]',
      'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
    );
    metaDataTags('head meta[name="og:image:alt"]', 'BBC News');
    metaDataTags('head meta[name="og:locale"]', 'en_GB');
    metaDataTags('head meta[name="og:site_name"]', 'BBC News');
    metaDataTags(
      'head meta[name="og:title"]',
      "Meghan's bouquet laid on tomb of unknown warrior",
    );
    metaDataTags('head meta[name="og:type"]', 'article');
    metaDataTags(
      'head meta[name="og:url"]',
      'https://www.bbc.com/news/articles/c0000000025o',
    );
  });

  it('should have Twitter meta data', () => {
    metaDataTags('head meta[name="twitter:card"]', 'summary_large_image');
    metaDataTags('head meta[name="twitter:creator"]', '@BBCNews');
    metaDataTags(
      'head meta[name="twitter:description"]',
      'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    );
    metaDataTags('head meta[name="twitter:image:alt"]', 'BBC News');
    metaDataTags(
      'head meta[name="twitter:image:src"]',
      'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
    );
    metaDataTags('head meta[name="twitter:site"]', '@BBCNews');
    metaDataTags(
      'head meta[name="twitter:title"]',
      "Meghan's bouquet laid on tomb of unknown warrior",
    );
  });
});
