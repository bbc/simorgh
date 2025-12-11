import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import { INTERNAL_SERVER_ERROR, OK } from '#app/lib/statusCodes.const';
import nodeLogger from '#lib/logger.node';
import { ROUTING_INFORMATION } from '#app/lib/logger.const';
import getPageData from '../../utilities/pageRequests/getPageData';

const HomePage = dynamic(() => import('#pages/HomePage/HomePage'));

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const { renderer_env: rendererEnv } = context.query as PageDataParams;

  const { data, toggles } = await getPageData({
    service: 'ws',
    rendererEnv,
    resolvedUrl: '/ws/languages',
    pageType: HOME_PAGE,
  });

  let routingInfoLogger = logger.debug;
  if (data.status !== OK) {
    routingInfoLogger = logger.error;
  }

  routingInfoLogger(ROUTING_INFORMATION, {
    url: context.resolvedUrl,
    status: data.status,
    pageType: HOME_PAGE,
  });

  const returnData = {
    props: {
      pageType: HOME_PAGE,
      service: 'ws',
      pathname: '/ws/languages',
      status: data?.status ?? INTERNAL_SERVER_ERROR,
      isAmp: false,
      isNextJs: true,
      error: data?.error || null,
      toggles,
      timeOnServer: Date.now(),
      pageData: {
        ...data?.pageData,
        metadata: {
          ...data?.pageData?.metadata,
          type: HOME_PAGE,
          atiAnalytics: {
            ...data?.pageData?.metadata?.atiAnalytics,
            pageIdentifier: 'ws.languages.page',
          },
        },
      },
    },
  };

  return returnData;
};

export default HomePage;
