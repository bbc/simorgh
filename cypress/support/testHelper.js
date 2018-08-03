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

export const shouldHaveDescendants = (element, descendantElement) => {
  element.should('to.have.descendants', descendantElement);
};

export const shouldNotHaveDescendants = (element, descendantElement) => {
  element.should('not.to.have.descendants', descendantElement);
};

export const checkElementStyles = (elementString, text, color, fontFamily) => {
  const el = getElement(elementString);
  shouldContainText(el, text);
  shouldContainStyles(el, 'color', color);
  shouldContainStyles(el, 'font-family', fontFamily);
};

export const noImageCaption = (figure, img, caption) => {
  figure.should('be.visible');
  shouldHaveDescendants(figure, img);
  shouldNotHaveDescendants(figure, caption);
};

export const imageCaption = (figure, img, caption) => {
  figure.should('be.visible');
  shouldHaveDescendants(figure, img);
  shouldHaveDescendants(figure, caption);
};
