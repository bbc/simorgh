import config from '../support/config';
import {
  getElement,
  getSecondElement,
  hasHtmlLangDirAttributes,
} from '../support/bodyTestHelper';
import {
  checkAmpHTML,
  checkCanonicalURL,
  facebookMeta,
  metadataAssertion,
  metadataAssertionAMP,
  openGraphMeta,
  retrieveMetaDataContent,
  twitterMeta,
} from '../support/metaTestHelper';

describe('Article Meta Tests', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.visit(`/news/articles/${config.assets.newsThreeSubheadlines}`);
  });

  it('should have the correct lang & dir attributes', () => {
    hasHtmlLangDirAttributes({ lang: 'en-gb', dir: 'ltr' });
  });

  it('should have a nofollow meta tag', () => {
    retrieveMetaDataContent('head meta[name="robots"]', 'noodp,noydir');
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
      .and('match', /(\/static\/js\/main-\w+\.\w+\.js)/g);
  });

  it('should have resource hints', () => {
    const resources = [
      config.assetOrigin,
      'https://ichef.bbci.co.uk',
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

  openGraphMeta(
    'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
    'BBC News',
    'en_GB',
    'BBC News',
    "Meghan's bouquet laid on tomb of unknown warrior",
    'article',
    `https://www.bbc.com/news/articles/${config.assets.newsThreeSubheadlines}`,
  );

  twitterMeta(
    'summary_large_image',
    '@BBCNews',
    'Meghan follows the royal bridal tradition started by the Queen Mother in 1923.',
    'BBC News',
    'https://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png',
    '@BBCNews',
    "Meghan's bouquet laid on tomb of unknown warrior",
  );

  it('should include metadata that matches the JSON data', () => {
    metadataAssertion();
  });

  it('should include the canonical URL & ampHTML', () => {
    const currentOrigin = window.location.origin;
    const canonicalOrigin = 'https://www.bbc.com';
    checkCanonicalURL(
      `${canonicalOrigin}/news/articles/${config.assets.newsThreeSubheadlines}`,
    );
    checkAmpHTML(
      `${currentOrigin}/news/articles/${config.assets.newsThreeSubheadlines}.amp`,
    );
  });

  it('should include metadata in the head on AMP pages', () => {
    metadataAssertionAMP(
      `/news/articles/${config.assets.newsThreeSubheadlines}.amp`,
    );
  });

  it('should include mainEntityOfPage in the LinkedData', () => {
    const script = cy.get('script[type="application/ld+json"]');
    script.should('contain', 'mainEntityOfPage');
  });
});
