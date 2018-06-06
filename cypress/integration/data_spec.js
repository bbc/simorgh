describe('Static Articles data', () => {
  it('should display 200/OK', () => {
    cy.request('/data/scenario-01.json').then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('should output valid JSON', () => {
    cy.request('/data/scenario-01.json').then(({ body }) => {
      expect(body).to.be.an('object');
    });
  });
});
