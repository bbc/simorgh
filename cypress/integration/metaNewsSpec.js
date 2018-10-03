import { getElement, getSecondElement } from '../support/bodyTestHelper';
import {
  facebookMeta,
  metaDataDescription,
  openGraphMeta,
  retrieveMetaDataContent,
  twitterMeta,
} from '../support/metaTestHelper';

describe('Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    // Only 'c0000000025o' & 'c0000000027o' are available within the PROD enviroment
    cy.visit('/news/articles/c0000000025o');
  });

  it('should have a nofollow meta tag', () => {
    retrieveMetaDataContent('head meta[name="robots"]', 'noindex,nofollow');
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

  facebookMeta(
    '100004154058350',
    '1609039196070050',
    'https://www.facebook.com/bbcnews',
  );

  it('should have description meta data', () => {
    metaDataDescription(
      'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    );
  });

  openGraphMeta(
    'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
    'BBC News',
    'en_GB',
    'BBC News',
    "Meghan's bouquet laid on tomb of unknown warrior",
    'article',
    'https://www.bbc.com/news/articles/c0000000025o',
  );

  twitterMeta(
    'summary_large_image',
    '@BBCNews',
    'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    'BBC News',
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1',
    '@BBCNews',
    "Meghan's bouquet laid on tomb of unknown warrior",
  );
});
