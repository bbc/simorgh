export default (variant) => {
  cy.get(`a[data-variant="${variant}"]`).click();
};
