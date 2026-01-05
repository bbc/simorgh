export default (hasRadioSchedule = true) => {
  describe('Radio Schedule', () => {
    it('should be in the document if enabled for service, otherwise should not be in the document', async () => {
      const scheduleWrapperEl = document.querySelector(
        '[data-e2e="radio-schedule"]',
      );

      if (hasRadioSchedule) {
        expect(scheduleWrapperEl).toBeInTheDocument();
      } else {
        expect(scheduleWrapperEl).not.toBeInTheDocument();
      }
    });
  });
};
