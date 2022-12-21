import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import applyBasicPageHandlers from '../../../../../src/app/pages/utils/applyBasicPageHandlers';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import bffFetch from '../../../../../src/app/routes/topic/getInitialData';
import getAgent from '../../../../../src/server/utilities/getAgent';
import getToggles from '../../../../../src/app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';

import LivePageLayout from './LivePageLayout';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(LivePageLayout);

interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: Variants;
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
    path: `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}}`,
    service,
    variant,
  });

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
  const { data, toggles } = await getPageData({
    id,
    page,
    service,
    variant,
    rendererEnv: 'live', // TODO: remove hardcoding
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
