import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

export default async ({ service, pageType }) => {
  const config = await getConfig(service);

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
