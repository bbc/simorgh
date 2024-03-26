import { GetServerSideProps } from 'next';
import nodeLogger from '#lib/logger.node';
import PageDataParams from '#models/types/pageDataParams';
import { UGC_PAGE } from '#app/routes/utils/pageTypes';
import getPageData from '../../../../utilities/pageRequests/getPageData';
import UGCPageLayout from './UGCPageLayout';

const logger = nodeLogger(__filename);

const fetchData = async ({
  id,
  service,
  variant,
  rendererEnv,
  resolvedUrl,
}: PageDataParams) => {
  const pathname = `${id}${rendererEnv ? `?renderer_env=${rendererEnv}` : ''}`;

  const { data, toggles } = await getPageData(
    { id, service, rendererEnv, resolvedUrl },
    { pageType: 'ugcForm', pathname, service, variant },
    logger,
    UGC_PAGE,
  );

  return { data, toggles };
};

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    id,
    service,
    variant,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const { data, toggles } = await fetchData({
    id,
    service,
    variant,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
  });

  const { pageData = null, status } = data;

  return {
    props: {
      id,
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
