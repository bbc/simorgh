const servicesWithRadioSchedule = ['indonesia'];
const servicesWithoutRadioSchedule = ['gahuza'];

export default ({ isAmp = false } = {}) => {
  describe('Radio Schedule', () => {
    const scheduleWrapperEl = document.querySelector(
      '[data-e2e="radio-schedule"]',
    );

    if (!isAmp && servicesWithRadioSchedule.includes(service)) {
      it('should be in the document', () => {
        expect(scheduleWrapperEl).toBeInTheDocument();
      });
    }
    if (isAmp || servicesWithoutRadioSchedule.includes(service)) {
      it('should not be in the document', () => {
        expect(scheduleWrapperEl).not.toBeInTheDocument();
      });
    }
  });
};
