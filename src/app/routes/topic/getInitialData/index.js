import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { TOPIC_PAGE } from '../../utils/pageTypes';

const logger = nodeLogger(__filename);

export default async ({ service, path: pathname, variant, page }) => {

  if (!pathname.includes('renderer_env')) {
  }

  try {
    const { status, json } = await fetchDataFromBFF({
      pathname,
      service,
      variant,
      pageType: TOPIC_PAGE,
      page,
    });

    const { data } = json;

    const imageData = data.imageData || null;

    const scriptSwitchId = data.variantTopicId;

    return {
      status,
      pageData: {
        title: data.title,
        description: data.description,
        imageData,
        curations: data.curations,
        activePage: data.activePage || 1,
        pageCount: data.pageCount,
        scriptSwitchId,
        renderScriptSwitch: Boolean(scriptSwitchId),
        metadata: {
          ...data.metadata,
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
