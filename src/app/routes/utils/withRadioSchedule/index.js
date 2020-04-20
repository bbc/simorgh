import 'isomorphic-fetch';
import nodeLogger from '#lib/logger.node';
import { getRadioScheduleEndpoint } from '#lib/utilities/getRadioSchedulesUrls';
import { getQueryString } from '#lib/utilities/urlParser';
import processRadioSchedule from '#containers/RadioSchedule/utilities/processRadioSchedule';
import { DATA_REQUEST_RECEIVED, DATA_FETCH_ERROR } from '#lib/logger.const';

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
    const error = e.toString();
    logger.error(DATA_FETCH_ERROR, { error });
  };

  return fetch(url).then(handleResponse).catch(handleError);
};

const withRadioSchedule = async (pageDataPromise, service, path) => {
  const { SIMORGH_APP_ENV, SIMORGH_BASE_URL } = process.env;

  const radioScheduleUrl = getRadioScheduleEndpoint({
    service,
    env: SIMORGH_APP_ENV,
    queryString: getQueryString(path),
    baseUrl: SIMORGH_BASE_URL,
  });

  logger.info(DATA_REQUEST_RECEIVED, { url: radioScheduleUrl });
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
