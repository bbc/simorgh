import { GetServerSideProps } from 'next';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#models/types/pageDataParams';
import { UGC_PAGE } from '#app/routes/utils/pageTypes';
import isLitePath from '#app/routes/utils/isLitePath';
import isAppPath from '#app/routes/utils/isAppPath';
import getPageData from '../../../../utilities/pageRequests/getPageData';
import UGCPageLayout from './UGCPageLayout';
import extractHeaders from '../../../../../src/server/utilities/extractHeaders';

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const { headers: reqHeaders } = context.req;
  const isLite = isLitePath(context.resolvedUrl);
  const isApp = isAppPath(context.resolvedUrl);

  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const fetchPageDataParams = {
    id,
    service,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
  };

  const constructUrlParams = {
    pageType: UGC_PAGE,
    service,
    variant,
  };

  const { data, toggles } = await getPageData(
    fetchPageDataParams,
    constructUrlParams,
    logger,
  );

  const { pageData = null, status } = data;

  return {
    props: {
      bbcOrigin: reqHeaders['bbc-origin'] || null,
      error: data?.error || null,
      id,
      isApp,
      isLite,
      isAmp: false,
      isNextJs: true,
      pageData: pageData
        ? {
            ...pageData,
            metadata: {
              ...pageData.metadata,
              type: UGC_PAGE,
            },
          }
        : null,
      pageType: UGC_PAGE,
      pathname: context.resolvedUrl,
      service,
      status: status ?? 500,
      toggles,
      variant: variant?.[0] || null,
      ...extractHeaders(reqHeaders),
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default UGCPageLayout;
