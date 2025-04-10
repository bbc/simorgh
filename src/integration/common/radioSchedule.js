import fetchToggles from '../utils/fetchToggles';

const isRadioScheduleToggleEnabled = async ({ service, pageType }) => {
  const pageTypeToggleMapping = {
    'Live Radio': 'liveRadioSchedule',
    'On Demand Audio Page': 'onDemandRadioSchedule',
  };
  const radioScheduleToggleName = pageTypeToggleMapping[pageType];

  const toggles = await fetchToggles(service);

  const { enabled: hasRadioSchedule } = toggles[radioScheduleToggleName] || {};

  return hasRadioSchedule;
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
