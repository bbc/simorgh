import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { MY_NEWS_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import extractHeaders from '#server/utilities/extractHeaders';
import logResponseTime from '#server/utilities/logResponseTime';
import getToggles from '#app/lib/utilities/getToggles/withCache';

const MyNewsPage = dynamic(() => import('./MyNewsPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  const toggles = await getToggles(service);
  const isUasPersonalizationEnabled = toggles?.uasPersonalization?.enabled;

  if (!isUasPersonalizationEnabled) {
    context.res.statusCode = 4004;
    return {
      props: {
        service,
        variant,
        status: 404,
        timeOnServer: Date.now(),
        pathname: `/${service}/my-news`,
        ...extractHeaders(context.req.headers),
      },
    };
  }

  logResponseTime({ path: context.resolvedUrl }, context.res, () => null);

  context.res.setHeader(
    'Cache-Control',
    'public, max-age=300, stale-while-revalidate=600, stale-if-error=3600',
  );

  return {
    props: {
      service,
      variant,
      pageType: MY_NEWS_PAGE,
      status: 200,
      timeOnServer: Date.now(),
      pathname: `/${service}/my-news`,
      ...extractHeaders(context.req.headers),
      pageData: {
        metadata: {
          type: MY_NEWS_PAGE,
        },
      },
    },
  };
};

export default MyNewsPage;
