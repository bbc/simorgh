import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import fetchPageData from '../../utils/fetchPageData';

const logger = nodeLogger(__filename);

export default async ({ getAgent, service, path: pathname, variant }) => {
  const agent = await getAgent();
  try {
    const path = process.env.BFF_PATH || pathname;
    const { status, json } = await fetchPageData({ path, agent });
    return {
      status,
      pageData: {
        ...json.data,
        promos: json.data.summaries,
      },
    };
  } catch (error) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      error,
    });
    return { error, status: INTERNAL_SERVER_ERROR };
  }
};
