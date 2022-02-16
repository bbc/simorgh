import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import { fixturePromos } from '#pages/TopicPage/fixtures';
import fetchPageData from '../../utils/fetchPageData';

const logger = nodeLogger(__filename);

export default async ({ getAgent, service }) => {
  const agent = await getAgent();
  const options = {
    method: 'GET',
    agent,
  };
  try {
    const path = process.env.BFF_PATH;
    const { status, json } = await fetchPageData({ path, options });
    return {
      status,
      pageData: {
        ...json,
        promos: fixturePromos(),
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
