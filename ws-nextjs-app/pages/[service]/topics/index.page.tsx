import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { TopicsData } from './types';

const TopicsPageComponent = dynamic(() => import('./TopicsPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
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
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default TopicsPageComponent;
