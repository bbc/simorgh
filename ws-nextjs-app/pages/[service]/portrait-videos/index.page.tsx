import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { Services } from '#app/models/types/global';
import PageDataParams from '#app/models/types/pageDataParams';
import { getPortraitVideoPageData } from '#app/lib/config/portraitVideoPages';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import deriveVariant from '#utilities/deriveVariant';

const PortraitVideosPage = dynamic(() => import('./PortraitVideosPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);
  const pageData = getPortraitVideoPageData(service as Services);
  const pathname = `/${service}/portrait-videos`;

  if (!pageData) {
    context.res.statusCode = NOT_FOUND;

    return {
      props: {
        service,
        variant,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        pathname,
      },
    };
  }

  context.res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
  );

  return {
    props: {
      service,
      variant,
      pageType: STATIC_PAGE,
      status: OK,
      timeOnServer: Date.now(),
      pathname,
      pageData: {
        ...pageData,
        metadata: {
          type: STATIC_PAGE,
          atiAnalytics: {
            pageIdentifier: 'portrait-videos.page',
          },
        },
      },
    },
  };
};

export default PortraitVideosPage;
