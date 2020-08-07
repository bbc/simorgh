import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

export default async ({ service, pageType, pathname }) => {
  const config = await getConfig(service);

  if (service === 'persian' && pathname.includes('bbc_persian_radio')) {
    return 'persian';
  }

  const configKeyName = {
    liveRadio: 'onLiveRadioPage',
    onDemandRadio: 'onOnDemandRadioPage',
  }[pageType];

  const radioScheduleIsEnabledForService = path(
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleIsEnabledForPageType = path(
    ['radioSchedule', configKeyName],
    config,
  );

  return Boolean(
    radioScheduleIsEnabledForService && radioScheduleIsEnabledForPageType,
  );
};
