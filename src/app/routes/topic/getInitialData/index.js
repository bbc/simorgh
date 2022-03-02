import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import fetchPageData from '../../utils/fetchPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';

const logger = nodeLogger(__filename);

export default async ({ getAgent, service, path: pathname, variant }) => {
  try {
    const agent = await getAgent();
    const id = pathname.split('/').pop();
    const path = `${process.env.BFF_PATH}?id=${id}&service=${service}${
      variant ? `&variant=${variant}` : ``
    }`;
    const { status, json } = await fetchPageData({ path, agent });
    const { data } = json;
    return {
      status,
      pageData: {
        title: data.title,
        promos: data.summaries,
        metadata: {
          type: 'Topic',
        },
      },
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
