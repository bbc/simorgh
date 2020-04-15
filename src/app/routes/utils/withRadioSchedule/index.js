import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import { fetchData } from '../fetchPageData';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';

const withRadioSchedules = async (pageDataPromise, service, path) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;

  const radioScheduleUrl = getRadioScheduleEndpoint({
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
    baseUrl: SIMORGH_BASE_URL,
  });

  const radioSchedulePromise = fetchData(radioScheduleUrl);

  const [
    { json: pageJSON, ...rest },
    radioScheduleResponse,
  ] = await Promise.all([pageDataPromise, radioSchedulePromise]);

  const radioScheduleData = processRadioSchedule(
    radioScheduleResponse.json,
    service,
    Date.now(),
  );

  return {
    ...rest,
    ...(pageJSON && { json: { ...pageJSON, radioScheduleData } }),
  };
};

export default withRadioSchedules;
