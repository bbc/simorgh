import { GetServerSideProps } from 'next';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#models/types/pageDataParams';
import { UGC_PAGE } from '#app/routes/utils/pageTypes';
import isLitePath from '#app/routes/utils/isLitePath';
import getPageData from '../../../../utilities/pageRequests/getPageData';
import UGCPageLayout from './UGCPageLayout';

const logger = nodeLogger(__filename);

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const isLite = isLitePath(context.resolvedUrl);

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
      id,
      isLite,
      isAmp: false,
      isNextJs: true,
      pageData,
      pageType: 'ugc',
      pathname: null,
      service,
      status: status ?? 500,
      toggles,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default UGCPageLayout;
