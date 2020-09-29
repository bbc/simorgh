export default ({ service, pageType, variant }) => {
  describe(`testsForAMPOnly for ${service} ${pageType} ${variant}`, () => {
    describe('Chartbeat', () => {
      it('should have the correct config UID', () => {
        cy.hasAmpChartbeatConfigUid();
      });
    });
  });
};
