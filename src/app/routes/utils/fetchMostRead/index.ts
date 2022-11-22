import 'isomorphic-fetch';
import { getMostReadEndpoint } from '../../../lib/utilities/getUrlHelpers/getMostReadUrls';
import {
  MOST_READ_REQUEST_RECEIVED,
  MOST_READ_FETCH_ERROR,
} from '../../../lib/logger.const';
import nodeLogger from '../../../lib/logger.node';
import { Services, Variants } from '../../../models/types/global';
import getUrl from '../fetchPageData/utils/getUrl';

const logger = nodeLogger(__filename);

type Props = {
  service: Services;
  variant: Variants;
};

const fetchMostRead = async ({ service, variant }: Props) => {
  const mostReadUrl = getMostReadEndpoint({ service, variant }).split('.')[0];
  const url = getUrl(mostReadUrl);

  logger.info(MOST_READ_REQUEST_RECEIVED, { url });

  const handleResponse = async (response: any) => {
    const { status } = response;
    if (!response.ok) {
      throw Error(
        `Unexpected upstream response (HTTP status code ${status}) when requesting ${url}`,
      );
    }

    return response.json();
  };

  const handleError = (e: unknown) => {
    const error = e && e.toString();
    logger.error(MOST_READ_FETCH_ERROR, { error });
  };

  try {
    const response = await fetch(url);

    return handleResponse(response);
  } catch (e: unknown) {
    return handleError(e);
  }
};

export default fetchMostRead;
