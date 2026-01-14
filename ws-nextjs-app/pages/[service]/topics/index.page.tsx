import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { NOT_FOUND, OK } from '#app/lib/statusCodes.const';
import { Services } from '#app/models/types/global';

const TopicsPageComponent = dynamic(() => import('./TopicsPage'));

type TopicsFixture = {
  headline: string;
  topics: Array<{
    topicName: string;
    topicUrl: string;
    topicId?: string;
  }>;
};

const loadTopicsFixture = async (service: Services): Promise<TopicsFixture> => {
  try {
    const module = await import(`#app/fixtures/topics/${service}.json`);
    return module.default || module;
  } catch {
    throw new Error(`Topics fixture not found for service: ${service}`);
  }
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const variant = deriveVariant(variantFromUrl);

  try {
    const topicsData = await loadTopicsFixture(service as Services);
    if (
      typeof topicsData.headline !== 'string' ||
      !Array.isArray(topicsData.topics)
    ) {
      throw new Error('Invalid topics data structure');
    }
    const validatedTopics = topicsData.topics.map(topic => {
      const missingFields: string[] = [];
      if (!topic.topicName) missingFields.push('topicName');
      if (!topic.topicUrl) missingFields.push('topicUrl');

      if (missingFields.length > 0) {
        // eslint-disable-next-line no-console
        console.error(
          `[${service}] Invalid topic data:`,
          { topicId: topic.topicId },
          'Missing fields:',
          missingFields,
        );
      }

      return {
        topicName: topic.topicName || '',
        topicUrl: topic.topicUrl || '',
        topicId: topic.topicId,
      };
    });

    return {
      props: {
        service,
        variant,
        pageType: TOPIC_PAGE,
        status: OK,
        timeOnServer: Date.now(),
        pathname: `/${service}/topics`,
        topicsData: {
          headline: topicsData.headline,
          topics: validatedTopics,
        },
      },
    };
  } catch {
    context.res.statusCode = NOT_FOUND;
    return {
      props: {
        service,
        variant,
        pageType: TOPIC_PAGE,
        status: NOT_FOUND,
        timeOnServer: Date.now(),
        pathname: `/${service}/topics`,
        topicsData: null,
      },
    };
  }
};

export default TopicsPageComponent;
