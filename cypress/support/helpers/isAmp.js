export default () => {
  let isAmp = false;
  cy.url().then(url => {
    if (url.includes('amp')) {
      isAmp = true;
    }
    cy.log(isAmp);
  });
};
