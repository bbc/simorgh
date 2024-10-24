import nodeLogger from '#lib/logger.node';
import { getRadioScheduleEndpoint } from '#lib/utilities/getUrlHelpers/getRadioSchedulesUrls';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';
import { RADIO_SCHEDULE_FETCH_ERROR } from '#lib/logger.const';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const logger = nodeLogger(__filename);

const fetchData = url => {
  const handleResponse = async response => {
    const { status } = response;

    if (!response.ok) {
      throw Error(
        `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
      );
    }

    return response.json();
  };

  const handleError = e => {
    const error = e && e.toString();
    logger.error(RADIO_SCHEDULE_FETCH_ERROR, { error });
  };

  return fetch(url).then(handleResponse).catch(handleError);
};

const withRadioSchedule = async ({
  pageDataPromise,
  service,
  path,
  radioService,
}) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = getEnvConfig();

  const radioScheduleUrl = getRadioScheduleEndpoint({
    service,
    radioService,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
    baseUrl: SIMORGH_BASE_URL,
  });
  const radioSchedulePromise = fetchData(radioScheduleUrl);

  const [{ json: pageData, ...rest }, radioScheduleJson] = await Promise.all([
    pageDataPromise,
    radioSchedulePromise,
  ]);

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
