import {
  MOST_WATCHED_CLIENT_REQUEST,
  MOST_WATCHED_FETCH_ERROR,
} from '#lib/logger.const';
import getMostWatchedEndpoint from '#lib/utilities/getMostWatchedUrl';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const getMostWatchedData = async ({ service, variant }) => {
  const endpoint = getMostWatchedEndpoint({ service, variant });
  logger.info(MOST_WATCHED_CLIENT_REQUEST, { url: endpoint });

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(
        `Unexpected response (HTTP status code ${response.status}) when requesting ${endpoint}`,
      );
    }

    return response.json();
  } catch (error) {
    logger.error(MOST_WATCHED_FETCH_ERROR, {
      url: endpoint,
      error: error.toString(),
    });
    return [];
  }
};

export default getMostWatchedData;
