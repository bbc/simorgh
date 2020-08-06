import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

export default async ({ service, pageType }) => {
  const config = await getConfig(service);

  const configKeyName = {
    liveRadio: 'onLiveRadioPage',
    onDemandRadio: 'onOnDemandRadioPage',
  }[pageType];

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
