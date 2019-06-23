import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';

export const firstSubheadlineDataWindow = () => {
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

  const shouldMatchReturnedData = (data, element) => {
    cy.get(element).should('contain', data);
  };

  cy.window().then(win => {
    const subheadingData = getBlockData('subheadline', win);
    const { text } = subheadingData.model.blocks[0].model.blocks[0].model;

    shouldMatchReturnedData(text, 'h2');
  });
};

export const clickInlineLinkAndTestPageHasHTML = (link, url) => {
  cy.get(link).click();
  cy.url().should('contain', url);
  cy.get('header a').should('contain', 'BBC News');
};

export const placeholderImageLoaded = placeholderImage => {
  const shouldContainStyles = (element, css, styling) => {
    element.should(el => {
      expect(el).to.have.css(css, styling);
    });
  };

  shouldContainStyles(
    placeholderImage,
    'background-image',
    `url("data:image/svg+xml;base64,${BBC_BLOCKS}")`,
  );
};

export const visibleImageWithCaption = figure => {
  const figureVisibility = fig => {
    fig.should('be.visible');
    fig.should('to.have.descendants', 'img');
  };

  figureVisibility(figure);
  figure.should('to.have.descendants', 'figcaption');
};
