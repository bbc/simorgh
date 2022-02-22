import { BFF_FETCH_ERROR } from '#lib/logger.const';
import { INTERNAL_SERVER_ERROR } from '#lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import { fixturePromos } from '#pages/TopicPage/fixtures';
import fetchPageData from '../../utils/fetchPageData';

const logger = nodeLogger(__filename);

export default async ({ getAgent, service }) => {
  const BFF_PATH =
    'https://fabl.api.bbci.co.uk/preview/module/spike-simorgh-bff?id=c95y35941vrt&service=pidgin';
  const agent = await getAgent();
  try {
    const path = process.env.BFF_PATH;
    const { status, json } = await fetchPageData({ path, agent });
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
