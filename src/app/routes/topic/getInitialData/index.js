import { BFF_FETCH_ERROR } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import Url from 'url-parse';
import getEnvironment from '#app/routes/utils/getEnvironment';
import fetchPageData from '../../utils/fetchPageData';
import getErrorStatusCode from '../../utils/fetchPageData/utils/getErrorStatusCode';
import constructPageFetchUrl from '../../utils/constructPageFetchUrl';

const logger = nodeLogger(__filename);

const getServiceEnv = pathname => {
  const url = Url(`https://www.bbc.com${pathname}`, true);

  return url.query.renderer_env || 'live';
};

export default async ({ getAgent, service, path: pathname, variant, page }) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = isLocal ? null : await getAgent();

    const fetchUrl = constructPageFetchUrl({
      pathname,
      pageType: 'topic',
      service,
      variant,
      page,
    });

    const serviceEnv = getServiceEnv(pathname);
    const optHeaders = isLocal ? null : { 'ctx-service-env': serviceEnv };

    const { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      agent,
      optHeaders,
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
