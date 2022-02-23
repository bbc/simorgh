import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import fetchPageData from '../../utils/fetchPageData';

const logger = nodeLogger(__filename);

export default async ({ getAgent, service, path: pathname, variant }) => {
  const agent = await getAgent();
  try {
    // append ID, service, and variant (if exists)
    // to bff_path and pass to fetchPageData
    const path = process.env.BFF_PATH;
    const { status, json } = await fetchPageData({ path, agent });
    const { data } = json;
    return {
      status,
      pageData: {
        title: data.title,
        promos: data.summaries,
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
