import { BBCBlocksSVG } from '../../src/app/lib/constants/styles';

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

export const checkElementStylesWithText = (
  elementString,
  text,
  color,
  fontFamily,
) => {
  const el = getElement(elementString);
  shouldContainText(el, text);
  shouldContainStyles(el, 'color', color);
  shouldContainStyles(el, 'font-family', fontFamily);
};

export const checkElementStyles = (element, color, fontFamily) => {
  const el = getElement(element);
  shouldContainStyles(el, 'color', color);
  shouldContainStyles(el, 'font-family', fontFamily);
};

export const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

export const checkHeadline = headlinePosition => {
  cy.window().then(win => {
    const { promoHeadline } = win.SIMORGH_DATA.data.promo.headlines;
    getElement(headlinePosition).should('contain', promoHeadline);
  });
};

export const checkLinkStyling = position => {
  const link = cy.get('a').eq(position);
  shouldContainStyles(link, 'color', 'rgb(255, 255, 255)');
  link.focus();
  const linkSpan = link.get('span').eq(position);
  shouldContainStyles(
    linkSpan,
    'border-bottom',
    '2px solid rgb(255, 255, 255)',
  );
  link.invoke('mouseover');
  shouldContainStyles(
    linkSpan,
    'border-bottom',
    '2px solid rgb(255, 255, 255)',
  );
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
    'background-color',
    'rgb(236, 234, 231)',
  );
  shouldContainStyles(
    placeholderImage,
    'background-image',
    `url("data:image/svg+xml;base64,${BBCBlocksSVG}")`,
  );
};

export const figureVisibility = figure => {
  figure.should('be.visible');
  figure.should('to.have.descendants', 'img');
};

export const visibleImage = image => {
  cy.window().then(win => {
    const {
      locator,
    } = win.SIMORGH_DATA.data.content.model.blocks[1].model.blocks[0].model;
    getElement(image)
      .eq(0)
      .should('have.attr', 'src')
      .and('contain', locator);
  });
};

export const visibleImageNoCaption = figure => {
  figureVisibility(figure);
  figure.should('not.to.have.descendants', 'figcaption');
};

export const visibleImageWithCaption = figure => {
  figureVisibility(figure);
  figure.should('to.have.descendants', 'figcaption');
};
