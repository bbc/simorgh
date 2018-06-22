const testNonHTMLResponseCode = (path, responseCode) => {
  cy.request(path).then(({ status }) => {
    expect(status).to.eq(responseCode);
  });
};

const getElement = element => cy.get(element);

const shouldContainText = (element, text) => {
  element.should('contain', text);
};

const shouldContainStyles = (element, css, styling) => {
  element.should(el => {
    expect(el).to.have.css(css, styling);
  });
};

const shouldHaveMetadata = (element, content) => {
  element.should('have.attr', 'content', content);
};

export default {
  testNonHTMLResponseCode,
  shouldContainText,
  shouldContainStyles,
  getElement,
  shouldHaveMetadata,
};
