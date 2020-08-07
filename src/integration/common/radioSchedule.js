export default ({ shouldBeInTheDocument }) => {
  describe('Radio Schedule', () => {
    const scheduleWrapperEl = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    if (shouldBeInTheDocument) {
      it('should be in the document', () => {
        expect(scheduleWrapperEl).toBeInTheDocument();
      });
    } else {
      it('should not be in the document', () => {
        expect(scheduleWrapperEl).not.toBeInTheDocument();
      });
    }
  });
};
