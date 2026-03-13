import getErrorStatusCode from '#app/routes/utils/fetchPageData/utils/getErrorStatusCode';
import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

export default async ({ path: pathname, service, toggles, getAgent }) => {
  try {
    const { enabled: scheduleIsEnabled } = toggles.liveRadioSchedule;
    const disableRadioSchedule = !scheduleIsEnabled;

    const {
      status,
      json: { data: pageData },
    } = await fetchDataFromBFF({
      pathname,
      service,
      pageType: LIVE_RADIO_PAGE,
      getAgent,
      disableRadioSchedule,
    });

    return {
      status,
      pageData,
    };
  } catch ({ message, status = getErrorStatusCode() }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
