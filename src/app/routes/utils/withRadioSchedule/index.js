import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import { fetchData } from '../fetchPageData';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';

const withRadioSchedule = async (pageDataPromise, service, path) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;

  const radioScheduleUrl = getRadioScheduleEndpoint({
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
    baseUrl: SIMORGH_BASE_URL,
  });

  const radioSchedulePromise = fetchData(radioScheduleUrl);

  const [
    { json: pageData, ...rest },
    { json: radioScheduleJson },
  ] = await Promise.all([pageDataPromise, radioSchedulePromise]);

  const radioScheduleData = processRadioSchedule(
    radioScheduleJson,
    service,
    Date.now(),
  );

  return {
    ...rest,
    ...(pageData && { json: { ...pageData, radioScheduleData } }),
  };
};

export default withRadioSchedule;
