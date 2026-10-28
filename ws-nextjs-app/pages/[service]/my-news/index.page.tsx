import dynamic from 'next/dynamic';
import { MY_NEWS_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#utilities/deriveVariant';
import logResponseTime from '#utilities/logResponseTime';
import withRequestProps from '#utilities/pageRequests/withRequestProps';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';

const MyNewsPage = dynamic(() => import('./MyNewsPage'));

export const getServerSideProps = withRequestProps(async (context, props) => {
  const { toggles } = props;
  const {
    service,
    variant: variantFromUrl,
    page,
  } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  const isUasPersonalizationEnabled = toggles?.uasPersonalization?.enabled;

  if (!isUasPersonalizationEnabled) {
    context.res.statusCode = NOT_FOUND;
    return {
      props: {
        service,
        variant,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        pathname: `/${service}/my-news`,
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
      status: OK,
      timeOnServer: Date.now(),
      pathname: `/${service}/my-news`,
      page: page || null,
      pageData: {
        metadata: {
          type: MY_NEWS_PAGE,
          atiAnalytics: {
            pageIdentifier: 'my-news.page',
          },
        },
      },
    },
  };
});

export default MyNewsPage;
