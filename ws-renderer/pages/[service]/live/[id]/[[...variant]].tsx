import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import applyBasicPageHandlers from '../../../../../src/app/pages/utils/applyBasicPageHandlers';
import { Services, Variants } from '../../../../../src/app/models/types/global';
import bffFetch from '../../../../../src/app/routes/article/getInitialData/bffFetch';
import getAgent from '../../../../../src/server/utilities/getAgent';
import getToggles from '../../../../../src/app/lib/utilities/getToggles/withCache';
import { LIVE_PAGE } from '../../../../../src/app/routes/utils/pageTypes';

import LivePage from './LivePage';

export default applyBasicPageHandlers({
  addVariantHandling: true,
})(LivePage);

const getPageData = async (service: Services, id: string) => {
  const data = await bffFetch({
    service,
    path: `live/${id}?renderer_env=live`,
    getAgent,
  });
  const toggles = await getToggles(service);

  return { data, toggles };
};

interface PageParams extends ParsedUrlQuery {
  service: Services;
  variant?: Variants;
  id: string;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, id, variant } = context.params as PageParams;
  const { headers: reqHeaders } = context.req;
  const { data, toggles } = await getPageData(service, id);

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      isAmp: false,
      isNextJs: true,
      pageData: data?.pageData || null,
      pageType: LIVE_PAGE,
      pathname: context.resolvedUrl,
      service,
      showAdsBasedOnLocation: reqHeaders['bbc-adverts'] === 'true' || false,
      status: data.status,
      toggles,
      variant: variant?.[0] || null,
    },
  };
};
