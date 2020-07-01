import path from 'ramda/src/path';
import getConfig from '#app/routes/utils/getConfig';

const hasRadioScheduleInConfig = async (service, variant) => {
  const config = await getConfig(service, variant);

  const serviceHasRadioSchedule = path(
    ['radioSchedule', 'hasRadioSchedule'],
    config,
  );

  const radioScheduleOnIdx = path(['radioSchedule', 'onIdxPage'], config);

  return serviceHasRadioSchedule && radioScheduleOnIdx;
};

export default hasRadioScheduleInConfig;
