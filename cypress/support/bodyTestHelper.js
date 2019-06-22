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
