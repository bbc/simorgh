describe('Static Articles data', () => {
  const testScenarioRequest = (testTitle, scenarioNumber, testAssertion) => {
    it(testTitle, () => {
      cy.request(`/data/scenario-${scenarioNumber}.json`).then(testAssertion);
    });
  };

  testScenarioRequest(
    'should return a status code of 200',
    '01',
    ({ status }) => {
      expect(status).to.eq(200);
    },
  );

  describe('Response Body', () => {
    testScenarioRequest('should be an object', '01', ({ body }) => {
      expect(body).to.be.an('object');
    });

    testScenarioRequest('should contain a blocks object', '01', ({ body }) => {
      expect(body).to.have.property('blocks');
    });
  });
});
