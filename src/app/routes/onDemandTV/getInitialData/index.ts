import fetchDataFromBFF from '#app/routes/utils/fetchDataFromBFF';
import { InitialDataProps } from '#app/models/types/initialData';
import handleError from '#app/routes/utils/handleError';
import { BFF_FETCH_ERROR } from '#app/lib/logger.const';
import nodeLogger from '#app/lib/logger.node';
import { FetchError } from '#app/models/types/fetch';
import { TV_PAGE } from '#app/routes/utils/pageTypes';
import isTest from '#app/lib/utilities/isTest';
import overrideRendererOnTest from '#app/routes/utils/overrideRendererOnTest';

const logger = nodeLogger(__filename);

export default async ({
  service,
  variant,
  path: pathname,
  getAgent,
  toggles,
}: InitialDataProps) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname: isTest() ? overrideRendererOnTest(pathname) : pathname,
      service,
      variant,
      pageType: TV_PAGE,
      getAgent,
    });

    if (!json?.data) {
      throw handleError('On Demand TV data is malformed', 500);
    }

    const data = json?.data;

    const maxRecentEpisodes =
      // @ts-expect-error recentVideoEpisodes does exist on the toggles object
      toggles?.recentVideoEpisodes?.enabled
        ? // @ts-expect-error recentVideoEpisodes does exist on the toggles object
          toggles?.recentVideoEpisodes?.value || 4
        : 0;

    const recentEpisodes =
      maxRecentEpisodes > 0
        ? data.recentEpisodes.slice(0, maxRecentEpisodes)
        : null;

    return {
      status,
      pageData: {
        ...data,
        recentEpisodes,
      },
    };
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });

    return { error: message, status };
  }
};
