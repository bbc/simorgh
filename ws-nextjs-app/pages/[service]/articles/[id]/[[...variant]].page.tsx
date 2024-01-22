import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import logResponseTime from '#server/utilities/logResponseTime';
import isAppPath from '#app/routes/utils/isAppPath';

import {
  BFF_FETCH_ERROR,
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';

import { OK } from '#app/lib/statusCodes.const';

import { FetchError } from '#app/models/types/fetch';
import ArticlePage from '../../../../../src/app/pages/ArticlePage/ArticlePage';
import extractHeaders from '../../../../../src/server/utilities/extractHeaders';
import getArticleData from '../../../../../src/app/routes/article/getInitialData';

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
}

const logger = nodeLogger(__filename);

const getPageData = async ({
  id,
  service,
  variant,
  rendererEnv = 'test',
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;

  let pageStatus;
  let pageJson;
  let errorMessage;

  try {
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const { pageData, status } = await getArticleData({
      service,
      variant,
      pageType: 'article',
      path: pathname,
      isAmp: false,
    });
    pageStatus = status;
    pageJson = pageData;
  } catch (error: unknown) {
    const { message, status } = error as FetchError;

    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    pageStatus = status;
    errorMessage = message;
  }

  const toggles = await getToggles(service);

  const data = pageJson
    ? { pageData: pageJson, status: pageStatus }
    : { error: errorMessage, status: pageStatus };

  return { data, toggles };
};

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );

  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  const isApp = isAppPath(context.resolvedUrl);

  logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
    pageType: ARTICLE_PAGE,
  });

  const { data, toggles } = await getPageData({
    id,
    service,
    variant,
    rendererEnv,
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: ARTICLE_PAGE,
  });

  context.res.statusCode = data.status;
  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: data?.error || null,
      id,
      isApp,
      isAmp: false,
      isNextJs: true,
      pageData: data?.pageData
        ? {
            ...data.pageData,
            metadata: {
              ...data.pageData.metadata,
              type: ARTICLE_PAGE,
            },
          }
        : null,
      pageType: ARTICLE_PAGE,
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
    },
  };
};

export default ArticlePage;
