describe('Static Articles data', () => {
  it('should return a 200 status code', () => {
    cy.request({
      url: `https://www.bbc.com/igbo.json`,
      failOnStatusCode: false,
    }).then(({ status, headers }) => {
      expect(status).to.eq(200);
      expect(headers['content-type']).to.include('application/json');
      // Always ensure we're not seeing the Mozart fallback
      expect(headers).not.to.have.property('x-mfa');
        },
        );
  });
});
