/* eslint-disable camelcase */
import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import Url from 'url-parse';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { TOPIC_PAGE } from '../../utils/pageTypes';

const logger = nodeLogger(__filename);

const getLivePathname = pathname => {
  const url = Url(pathname, true);

  if (!url.query.renderer_env) {
    url.query.renderer_env = 'live';
  }
  return url.toString();
};

export default async ({ service, path: pathname, variant, page }) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname: getLivePathname(pathname),
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
