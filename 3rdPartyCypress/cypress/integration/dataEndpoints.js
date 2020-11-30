describe('Data endpoints 200 and return JSON', () => {
  it('should pass for front pages', () => {
    cy.testResponseCodeAndType({
      path: 'https://www.bbc.com/igbo.json',
      responseCode: 200,
      type: 'application/json',
    });
    cy.testResponseCodeAndType({
      path: 'https://www.bbc.com/pidgin.json',
      responseCode: 200,
      type: 'application/json',
    });

    cy.testResponseCodeAndType({
      path: 'https://www.bbc.com/yoruba.json',
      responseCode: 200,
      type: 'application/json',
    });
  });
  it('should pass for articles', () => {
    cy.testResponseCodeAndType({
      path: 'https://www.bbc.com/news/articles/c5ll353v7y9o.json',
      responseCode: 200,
      type: 'application/json',
    });
    cy.testResponseCodeAndType({
      path: 'https://www.bbc.com/persian/articles/c7eel0lmr4do.json',
      responseCode: 200,
      type: 'application/json',
    });
  });
});
