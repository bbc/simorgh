import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';

export const shouldContainText = (element, text) => {
  element.should('contain', text);
};

export const shouldContainStyles = (element, css, styling) => {
  element.should(el => {
    expect(el).to.have.css(css, styling);
  });
};

export const shouldMatchReturnedData = (data, element) => {
  cy.get(element).should('contain', data);
};

export const getBlockByType = (blocks, blockType) => {
  let blockData;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
};

export const getBlockData = (blockType, win) => {
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

export const figureVisibility = figure => {
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

export const hasHtmlLangDirAttributes = ({ lang, dir }) => {
  cy.get('html')
    .should('have.attr', 'lang', lang)
    .and('have.attr', 'dir', dir);
};
