import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import { PageTypes } from '#app/models/types/global';
import getPageData from '#nextjs/utilities/pageRequests/getPageData';

const LiveTvLayout = dynamic(() => import('./LiveTvPageLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );
  const {
    id,
    service,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const { data, toggles } = await getPageData({
    id,
    service,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
    pageType: LIVE_TV_PAGE,
  });

  const baseProps = {
    isNextJs: true,
    status: data.status,
    pageType: LIVE_TV_PAGE as PageTypes,
    service,
    toggles,
    pageData: data?.pageData
      ? {
          ...data.pageData,
          metadata: {
            ...data.pageData.metadata,
            type: LIVE_TV_PAGE,
            atiAnalytics: {},
          },
        }
      : null,
    pathname: context?.resolvedUrl,
  };
  return {
    props: {
      ...baseProps,
    },
  };
};

export default LiveTvLayout;
