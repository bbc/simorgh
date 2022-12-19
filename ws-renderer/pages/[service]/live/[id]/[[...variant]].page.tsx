import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import applyBasicPageHandlers from '../../../../../src/app/pages/utils/applyBasicPageHandlers';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import bffFetch from '../../../../../src/app/routes/article/getInitialData/bffFetch';
import getAgent from '../../../../../src/server/utilities/getAgent';
import getToggles from '../../../../../src/app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';

import LivePageLayout from './LivePageLayout';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(LivePageLayout);

const getPageData = async (
  id: string,
  service: Services,
  variant?: Variants,
) => {
  const data = await bffFetch({
    getAgent,
    path: `live/${id}?renderer_env=live`,
    service,
    variant,
  });
  const toggles = await getToggles(service);

  return { data, toggles };
};

interface PageParams extends ParsedUrlQuery {
  id: string;
  service: Services;
  variant?: Variants;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id, service, variant } = context.params as PageParams;
  const { headers: reqHeaders } = context.req;
  const { data, toggles } = await getPageData(id, service, variant);

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      id,
      isAmp: false,
      isNextJs: true,
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
