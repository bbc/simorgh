export const testNonHTMLResponseCode = (path, responseCode) => {
  cy.request(path).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
};

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

export const checkElementStyles = (elementString, text, color, fontFamily) => {
  const el = getElement(elementString);
  shouldContainText(el, text);
  shouldContainStyles(el, 'color', color);
  shouldContainStyles(el, 'font-family', fontFamily);
};

export const checkFooterLinks = (position, url) => {
  cy.get('a')
    .eq(position)
    .should('have.attr', 'href')
    .and('contain', url);
};

export const checkLinkStyling = position => {
  const link = cy.get('a').eq(position);
  shouldContainStyles(link, 'color', 'rgb(255, 255, 255)');
  
  link.focus();
  shouldContainStyles(
    link.get('span').eq(position),
    'border-bottom',
    '2px solid rgb(255, 255, 255)',
  );
  link.invoke('mouseover');
  shouldContainStyles(
    link.get('span').eq(position),
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
