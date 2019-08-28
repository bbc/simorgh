describe('Data endpoints 200 and return JSON', () => {
  it('should pass for front pages', () => {
    cy.testResponseCodeAndType(
      'https://www.bbc.com/igbo.json',
      200,
      'application/json',
    );
    cy.testResponseCodeAndType(
      'https://www.bbc.com/pidgin.json',
      200,
      'application/json',
    );

    cy.testResponseCodeAndType(
      'https://www.bbc.com/yoruba.json',
      200,
      'application/json',
    );
  });
  it('should pass for articles', () => {
    cy.testResponseCodeAndType(
      'https://www.bbc.com/news/articles/c5ll353v7y9o.json',
      200,
      'application/json',
    );
    cy.testResponseCodeAndType(
      'https://www.bbc.com/persian/articles/c7eel0lmr4do.json',
      200,
      'application/json',
    );
  });
});
