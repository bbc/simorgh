import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

export default async ({ service, pathname, page }) => {
  const config = await getConfig(service);
  const isPersianRadio =
    service === 'persian' && pathname.includes('bbc_persian_radio');
  const configKeyName = {
    liveRadioPage: 'onLiveRadioPage',
    onDemandRadioPage: 'onOnDemandRadioPage',
  }[page];

  if (isPersianRadio) {
    // onLiveRadioPage and onOnDemandRadioPage is enabled on Persian to render the schedule for bbc_dari_radio
    // however bbc_persian_radio should not show the schedule
    return false;
  }

  const serviceHasRadioSchedule = path(
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleIsEnabledOnPage = path(
    ['radioSchedule', configKeyName],
    config,
  );

  return Boolean(serviceHasRadioSchedule && radioScheduleIsEnabledOnPage);
};
