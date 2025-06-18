import isToggleEnabled from '../utils/isToggleEnabled';

const isRadioScheduleToggleEnabled = async ({ service, pageType }) => {
  const pageTypeToggleMapping = {
    'Live Radio': 'liveRadioSchedule',
    'On Demand Audio Page': 'onDemandRadioSchedule',
  };
  const toggleName = pageTypeToggleMapping[pageType];

  return isToggleEnabled({ service, toggleName });
};

export default pageType => {
  describe('Radio Schedule', () => {
    it('should be in the document if toggle enabled, otherwise should not be in the document', async () => {
      const scheduleWrapperEl = document.querySelector(
        '[data-e2e="radio-schedule"]',
      );

      const hasRadioSchedule = await isRadioScheduleToggleEnabled({
        service,
        pageType,
      });

      if (hasRadioSchedule) {
        expect(scheduleWrapperEl).toBeInTheDocument();
      } else {
        expect(scheduleWrapperEl).not.toBeInTheDocument();
      }
    });
  });
};
