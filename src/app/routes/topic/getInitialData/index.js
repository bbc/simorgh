import Url from 'url-parse';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import nodeLogger from '../../../lib/logger.node';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import fetchDataFromBFF from '../../utils/fetchDataFromBFF';
import { TOPIC_PAGE } from '../../utils/pageTypes';
import isTest from '../../../lib/utilities/isTest';

const logger = nodeLogger(__filename);

const overrideRendererEnv = pathname => {
  if (isTest()) {
    const url = Url(pathname, true);

    if (!url.query.renderer_env) {
      url.query.renderer_env = 'live';
    }
    return url.toString();
  }
  return pathname;
};

export default async ({ service, path: pathname, variant, page, getAgent }) => {
  try {
    const { status, json } = await fetchDataFromBFF({
      pathname: overrideRendererEnv(pathname),
      service,
      variant,
      pageType: TOPIC_PAGE,
      page,
      getAgent,
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
