import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import { fetchData } from '../fetchPageData';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';

// should we think of a resusable pattern for using config outside of our react app?
// such as const config = await getConfig(service, variant); /

// checklist
// import config for the current service (without bloating the bundle size to 2MB) /
// only fetch radio schedule data if:
//   radio schedules is toggled on for this environment.
//   the page requires radio schedule data. /
// if it does, fetch that data /
// if we successfully fetch that data, process it (so we don't add 5,500 lines of JSON to the window) and merge into pageData /
// if we don't successfully fetch the data, don't try and merge it into page data. /
// make this reusable for other page types that need radio schedules data. /
// find a way to deal with config imports in tests /

// test this file
const withRadioSchedules = async (pageDataPromise, service, path) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;

  const radioScheduleUrl = getRadioScheduleEndpoint({
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
    baseUrl: SIMORGH_BASE_URL,
  });

  const radioSchedulePromise = fetchData(radioScheduleUrl);

  const [{ json, ...rest }, radioScheduleResponse] = await Promise.all([
    pageDataPromise,
    radioSchedulePromise,
  ]);

  const radioScheduleData = processRadioSchedule(
    radioScheduleResponse.json,
    service,
    Date.now(),
  );

  return {
    ...rest,
    json: { ...json, radioScheduleData },
  };
};

export default withRadioSchedules;
