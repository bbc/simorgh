import React from 'react';
import { headers } from 'next/headers';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import constructPageFetchUrl from '#app/routes/utils/constructPageFetchUrl';
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
import certsRequired from '#app/routes/utils/certsRequired';
import logResponseTime from '#server/utilities/logResponseTime';
import extractHeaders from '#server/utilities/extractHeaders';
import { IncomingHttpHeaders } from 'http';
import { OK } from '#app/lib/statusCodes.const';
import getAgent from '../../../../../utilities/undiciAgent';
import LivePageLayout from './LivePageLayout';
import Providers from '../../../../Providers';
import isValidPageNumber from '../../../../../utilities/pageQueryValidator';

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

  const agent = certsRequired(pathname) ? await getAgent() : null;

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

const nameThisBetter = async ({
  id,
  service,
  page = '1',
  rendererEnv,
  variant,
}: PageDataParams) => {
  // logResponseTime(
  //   {
  //     path: context.resolvedUrl,
  //   },
  //   context.res,
  //   () => null,
  // );

  const headersList = headers();

  if (!isValidPageNumber(page)) {
    // context.res.statusCode = 404;
    return {
      props: {
        bbcOrigin: headersList.get('bbc-origin') || null,
        isNextJs: true,
        service,
        status: 404,
        timeOnServer: Date.now(),
        variant: variant?.[0] || null,
        // ...extractHeaders(headersList),
      },
    };
  }

  logger.debug(SERVER_SIDE_RENDER_REQUEST_RECEIVED, {
    // url: context.resolvedUrl,
    headers: omit(
      (process.env.SENSITIVE_HTTP_HEADERS || '').split(','),
      headersList,
    ),
    pageType: LIVE_PAGE,
  });

  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv: 'test', // TODO: remove hardcoding
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    // url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  // context.res.statusCode = data.status;
  return {
    bbcOrigin: headersList.get('bbc-origin') || null,
    error: data?.error || null,
    id,
    isAmp: false,
    isNextJs: true,
    page: page || null,
    pageData: data?.pageData
      ? {
          ...data.pageData,
          metadata: {
            ...data.pageData.metadata,
            type: LIVE_PAGE,
          },
        }
      : null,
    pageType: LIVE_PAGE,
    // pathname: context.resolvedUrl,
    service,
    showAdsBasedOnLocation: headersList.get('bbc-adverts') === 'true' || false,
    status: data.status,
    timeOnServer: Date.now(), // TODO: check if needed?
    toggles,
    variant: variant?.[0] || null,
    // ...extractHeaders(headersList),
  };
};

export default async (props: any) => {
  const { id, service, variant } = props.params;

  const data = await nameThisBetter({
    id,
    service,
    rendererEnv: 'test',
    variant,
  });

  return (
    // @ts-expect-error - TODO: props not defined yet
    <Providers pageProps={data}>
      <LivePageLayout {...data} />
    </Providers>
  );
};
