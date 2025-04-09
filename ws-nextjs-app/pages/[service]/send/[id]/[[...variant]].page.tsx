import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import PageDataParams from '#models/types/pageDataParams';
import { UGC_PAGE } from '#app/routes/utils/pageTypes';
import isLitePath from '#app/routes/utils/isLitePath';
import isAppPath from '#app/routes/utils/isAppPath';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import extractHeaders from 'simorgh/src/server/utilities/extractHeaders/extractHeaders';
import getPageData from '../../../../utilities/pageRequests/getPageData';

const UGCPageLayout = dynamic(() => import('./UGCPageLayout'));

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
    variant: variantFromUrl,
    renderer_env: rendererEnv,
  } = context.query as PageDataParams;

  const variant = deriveVariant(variantFromUrl);

  const { data, toggles } = await getPageData({
    id,
    service,
    variant,
    rendererEnv,
    resolvedUrl: context.resolvedUrl,
    pageType: UGC_PAGE,
  });

  const { pageData = null, status } = data;

  return {
    props: {
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
      variant,
      timeOnServer: Date.now(), // TODO: check if needed?
      ...extractHeaders(reqHeaders),
    },
  };
};

export default UGCPageLayout;
