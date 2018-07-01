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
