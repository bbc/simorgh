import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';

const shouldContainStyles = (element, css, styling) => {
  element.should(el => {
    expect(el).to.have.css(css, styling);
  });
};

const shouldMatchReturnedData = (data, element) => {
  cy.get(element).should('contain', data);
};

const getBlockByType = (blocks, blockType) => {
  let blockData;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

const getBlockData = (blockType, win) => {
  const { blocks } = win.SIMORGH_DATA.pageData.content.model;

  return getBlockByType(blocks, blockType);
};

export const firstHeadlineDataWindow = () => {
  cy.window().then(win => {
    const headlineData = getBlockData('headline', win);
    const { text } = headlineData.model.blocks[0].model.blocks[0].model;

    shouldMatchReturnedData(text, 'h1');
  });
};

export const firstSubheadlineDataWindow = () => {
  cy.window().then(win => {
    const subheadingData = getBlockData('subheadline', win);
    const { text } = subheadingData.model.blocks[0].model.blocks[0].model;

    shouldMatchReturnedData(text, 'h2');
  });
};

export const firstParagraphDataWindow = () => {
  cy.window().then(win => {
    const paragraphData = getBlockData('text', win);
    const { text } = paragraphData.model.blocks[0].model;
    cy.get('p').should('contain', text);
  });
};

export const copyrightDataWindow = () => {
  cy.window().then(win => {
    const copyrightData = getBlockData('image', win);
    const rawImageblock = getBlockByType(
      copyrightData.model.blocks,
      'rawImage',
    );
    const { copyrightHolder } = rawImageblock.model;
    cy.get('figure p')
      .eq(0)
      .should('contain', copyrightHolder);
  });
};

// cut
export const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

export const clickInlineLinkAndTestPageHasHTML = (link, url) => {
  cy.get(link).click();
  cy.url().should('contain', url);
  cy.get('header a').should('contain', 'BBC News');
};

export const renderedTitle = title => {
  cy.title().should('eq', title);
};

export const placeholderImageLoaded = placeholderImage => {
  shouldContainStyles(
    placeholderImage,
    'background-image',
    `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
  );
};

// cut
export const worldServiceCookieBannerTranslations = (
  privacyStatement,
  performanceStatement,
  service,
  cookieAgreement,
  privacyAgreement,
) => {
  const getPrivacyBanner = () => cy.contains(privacyStatement);

  const getCookieBanner = () => cy.contains(performanceStatement);
  const getPrivacyBannerContainer = () => getPrivacyBanner().parent();
  const getCookieBannerContainer = () => getCookieBanner().parent();

  const visitArticle = () => {
    cy.visit(service, {
      failOnStatusCode: false,
    });
  };

  cy.clearCookies();
  visitArticle();

  getPrivacyBanner().should('be.visible');
  getCookieBanner().should('not.be.visible');

  getPrivacyBannerContainer()
    .contains(cookieAgreement)
    .click();

  getCookieBanner().should('be.visible');
  getPrivacyBanner().should('not.be.visible');

  getCookieBannerContainer()
    .contains(privacyAgreement)
    .click();

  getCookieBanner().should('not.be.visible');
  getPrivacyBanner().should('not.be.visible');
};

const figureVisibility = figure => {
  figure.should('be.visible');
  figure.should('to.have.descendants', 'img');
};

export const visibleImageNoCaption = figure => {
  figureVisibility(figure);
  figure.should('not.to.have.descendants', 'figcaption');
};

export const visibleImageWithCaption = figure => {
  figureVisibility(figure);
  figure.should('to.have.descendants', 'figcaption');
};

// used for error pages
export const errorMessage = service => {
  cy.get('h1 span').should(
    'contain',
    `${service.translations.error[404].statusCode}`,
  );
  cy.get('h1').should('contain', `${service.translations.error[404].title}`);
};

// used for error pages
export const errorPageInlineLink = service => {
  cy.get('main p')
    .eq(1)
    .within(() => {
      cy.get('a').should(
        'have.attr',
        'href',
        `${service.translations.error[404].callToActionLinkUrl}`,
      );
    });
};

// used for error pages
export const errorTitle = service => {
  renderedTitle(
    `${service.translations.error[404].title} - ${service.brandName}`,
  );
};

// used for error pages
export const hasNoscriptImgAtiUrlWithWSBucket = bucketId => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" src="https://a1.api.bbc.co.uk/hit.xiti?s=${bucketId}`,
    );
};

// used for ati tests
export const hasNoscriptImgAtiUrl = analyticsBucketId => {
  cy.get('noscript')
    .eq(0)
    .should(
      'contain',
      `<img height="1px" width="1px" alt="" src="https://a1.api.bbc.co.uk/hit.xiti?s=${analyticsBucketId}`,
    );
};

// used for ati tests
export const hasAmpAnalyticsAtiUrl = analyticsBucketId => {
  cy.get('amp-analytics script[type="application/json"]')
    .eq(0)
    .should('contain', 'https://a1.api.bbc.co.uk/hit.xiti?')
    .should('contain', `s=${analyticsBucketId}`);
};

// used all over the place
export const hasHtmlLangDirAttributes = ({ lang, dir }) => {
  const html = cy.get('html');
  html.should('have.attr', 'lang', lang);
  html.should('have.attr', 'dir', dir);
};
