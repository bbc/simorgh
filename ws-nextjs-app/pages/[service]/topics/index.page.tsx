import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { TopicsData } from './types';

const TopicsPageComponent = dynamic(() => import('./TopicsPageIndex'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const pageFromQuery = Array.isArray(context.query.page)
    ? context.query.page[0]
    : context.query.page;

  const page = pageFromQuery ?? null;
  const variant = deriveVariant(variantFromUrl);
  const validTopics = ['afrique'];

  if (!validTopics.includes(service)) {
    context.res.statusCode = 404;

    return {
      props: {
        service,
        status: 404,
        timeOnServer: Date.now(),
        variant,
        page,
      },
    };
  }

  try {
    const data = await import('#app/fixtures/topics/afrique.json');
    const topicsData: TopicsData = data.default || data;

    return {
      props: {
        service,
        variant,
        pageType: TOPIC_PAGE,
        status: 200,
        timeOnServer: Date.now(),
        pathname: `/${service}/topics`,
        topicsData,
        page,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default TopicsPageComponent;
