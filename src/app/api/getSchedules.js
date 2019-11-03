import filterCurrentRadioProgrammes from '#lib/utilities/preprocessor/rules/filterCurrentRadioProgrammes';
import preprocess from '#lib/utilities/preprocessor';
import servicesWithRadioOrTv from '../routes/config';
import onClient from '#lib/utilities/onClient';
import getBaseUrl from '../routes/getInitialData/utils/getBaseUrl';

const baseUrl = onClient()
  ? getBaseUrl(window.location.origin)
  : process.env.SIMORGH_BASE_URL;

const getSchedules = service => async () => {
  // only have these 2 APIs to test against
  if (!['afrique', 'korean'].includes(service)) {
    return undefined;
  }

  // get radio schedule name for that country
  // have some proper config for this
  const radioService = servicesWithRadioOrTv[service].find(channel =>
    channel.includes('radio'),
  );

  // make 'fetchData' generic + import, to handle error handling etc.
  const schedules = await fetch(
    `${baseUrl}/${service}/${radioService}/schedule.json`,
  );
  const scheduleData = await schedules.json();

  return preprocess(scheduleData, [filterCurrentRadioProgrammes]);
};

export default getSchedules;
