import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import omit from 'ramda/src/omit';
import applyBasicPageHandlers from '#pages/utils/applyBasicPageHandlers';
import bffFetch from '#app/routes/topic/getInitialData';
import getAgent from '#server/utilities/getAgent';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import nodeLogger from '#lib/logger.node';
import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
} from '#app/lib/logger.const';
import { Services, Variants } from '#models/types/global';

import LivePageLayout from './LivePageLayout';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(LivePageLayout);

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
}

const getPageData = async ({
  id,
  page,
  service,
  variant,
  rendererEnv,
}: PageDataParams) => {
  const data = await bffFetch({
    getAgent,
    page,
    path: `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`,
    service,
    variant,
  });

  const toggles = await getToggles(service);

  return { data, toggles };
};

export const getServerSideProps: GetServerSideProps = async context => {
  const logger = nodeLogger(__filename);

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
    rendererEnv: 'live', // TODO: remove hardcoding
  });

  logger.info(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: LIVE_PAGE,
  });

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
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
