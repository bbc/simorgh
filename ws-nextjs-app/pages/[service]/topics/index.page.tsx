import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { TopicsData, Topic } from './types';

const TopicsPageComponent = dynamic(() => import('./TopicsIndexPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  // eslint-disable-next-line no-console
  console.log('getServerSideProps context:', context);
  function filterValidTopics(topics: Topic[]): Topic[] {
    return topics.filter((topic, idx) => {
      const hasAll = topic.topicName && topic.topicUrl && topic.id;
      if (!hasAll) {
        // eslint-disable-next-line no-console
        console.log(
          `Topic at index ${idx} is missing required attributes: ${['topicName', 'topicUrl', 'id'].filter(attr => !topic[attr]).join(', ')}`,
        );
      }
      return hasAll;
    });
  }
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const pageFromQuery = Array.isArray(context.query.page)
    ? context.query.page[0]
    : context.query.page;

  const page = pageFromQuery ?? null;
  const variant = deriveVariant(variantFromUrl);
  const validServices = ['afrique'];

  if (!validServices.includes(service)) {
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
    const rawTopicsData = data?.default || data;
    const filteredTopics = filterValidTopics(rawTopicsData.topics);
    const topicsData: TopicsData = {
      ...rawTopicsData,
      topics: filteredTopics,
    };

    console.log('Filtered topics:', topicsData);

    context.res.setHeader(
      'Cache-Control',
      'public, stale-if-error=2400, stale-while-revalidate=960, max-age=240',
    );

    return {
      props: {
        service,
        variant,
        pageType: TOPIC_PAGE,
        status: 200,
        timeOnServer: Date.now(),
        pathname: context.resolvedUrl,
        topicsData,
        page,
      },
    };
  } catch {
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
};

export default TopicsPageComponent;
