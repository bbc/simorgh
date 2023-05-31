import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
import getAgent from '#server/utilities/getAgent';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  BFF_FETCH_ERROR,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';
import { FetchError } from '#models/types/fetch';

import getEnvironment from '#app/routes/utils/getEnvironment';
import fetchPageData from '#app/routes/utils/fetchPageData';

import LivePageLayout from './LivePageLayout';

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
  page,
  service,
  variant,
  rendererEnv,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;
  const livePageUrl = constructPageFetchUrl({
    page,
    pageType: 'live',
    pathname,
    service,
    variant,
  });

  const env = getEnvironment(pathname);
  const optHeaders = { 'ctx-service-env': env };
  const isLocal = !env || env === 'local';
  const certsNeeded = !isLocal && process.env.INTEGRATION_TEST_BUILD !== 'true';

  const agent = certsNeeded ? await getAgent() : null;

  let pageStatus;
  let pageJson;
  let errorMessage;

  const path = livePageUrl.toString();

  try {
    // @ts-expect-error Due to jsdoc inference, and no TS within fetchPageData
    const { status, json } = await fetchPageData({
      path,
      agent,
      optHeaders,
    });
    pageStatus = status;
    pageJson = json;
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

  const data = pageJson
    ? { pageData: pageJson.data, status: pageStatus }
    : { error: errorMessage, status: pageStatus };

  const toggles = await getToggles(service);

  return { data, toggles };
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    id,
    service,
    variant,
    // renderer_env: rendererEnv,
    page,
  } = context.query as PageDataParams;

  const { headers: reqHeaders } = context.req;

  logger.info(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      reqHeaders,
    ),
  });

  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv: 'test', // TODO: remove hardcoding
  });

  logger.info(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: data?.error || null,
      id,
      isAmp: false,
      isNextJs: true,
      page: page || null,
      pageData: data?.pageData || null,
      pageType: LIVE_PAGE,
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: data.status,
      timeOnServer: Date.now(), // TODO: check if needed?
      toggles,
      variant: variant?.[0] || null,
    },
  };
};

export default LivePageLayout;
