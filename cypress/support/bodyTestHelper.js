import { BBC_BLOCKS } from '@bbc/psammead-assets/svgs';

export const getElement = element => cy.get(element);

export const getSecondElement = element => cy.get(element).eq(1);

export const shouldContainText = (element, text) => {
  element.should('contain', text);
};

export const shouldContainStyles = (element, css, styling) => {
  element.should(el => {
    expect(el).to.have.css(css, styling);
  });
};

export const shouldMatchReturnedData = (data, element) => {
  getElement(element).should('contain', data);
};

export const getBlockData = (blockType, win) => {
  let blockData;
  const { blocks } = win.SIMORGH_DATA.data.content.model;

  blocks.forEach(block => {
    if (!blockData && block.type === blockType) {
      blockData = block;
    }
  });
  return blockData;
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
    const paragraphExample = getElement('p');

    shouldContainText(paragraphExample, text);
  });
};

export const copyrightDataWindow = () => {
  cy.window().then(win => {
    const copyrightData = getBlockData('image', win);
    const { copyrightHolder } = copyrightData.model.blocks[0].model;
    const copyrightLabel = getElement('figure p').eq(0);

    shouldContainText(copyrightLabel, copyrightHolder);
  });
};

export const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

export const clickInlineLinkAndTestPageHasHTML = (link, url) => {
  getElement(link).click();
  cy.url().should('contain', url);
  const anchorElement = getElement('header a');

  shouldContainText(anchorElement, 'BBC News');
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

export const errorMessage = service => {
  getElement('h1 span').should(
    'contain',
    `${service.translations.error[404].statusCode}`,
  );
  getElement('h1').should(
    'contain',
    `${service.translations.error[404].title}`,
  );
};

export const errorPageInlineLink = service => {
  getElement('main p')
    .eq(1)
    .within(() => {
      getElement('a').should(
        'have.attr',
        'href',
        `${service.translations.error[404].callToActionLinkUrl}`,
      );
    });
};

export const errorTitle = service => {
  renderedTitle(
    `${service.translations.error[404].title} - ${service.brandName}`,
  );
};
