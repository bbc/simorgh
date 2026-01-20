import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { Topic } from '#app/lib/config/fixtures/types';

const TopicsPageComponent = dynamic(() => import('./TopicsIndexPage'));

export const getServerSideProps: GetServerSideProps = async context => {
  const { service, variant: variantFromUrl } = context.query as PageDataParams;
  const pageFromQuery = Array.isArray(context.query.page)
    ? context.query.page[0]
    : context.query.page;

  const page = pageFromQuery ?? null;
  const variant = deriveVariant(variantFromUrl);
  const validServices = ['afrique', 'hausa'];

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
    const { default: topicsData } = await import(
      `#app/lib/config/fixtures/${service}`
    );
    context.res.setHeader(
      'Cache-Control',
      'public, stale-if-error=2400, stale-while-revalidate=960, max-age=240',
    );

    const PAGE_SIZE = 100;
    const activePage = Math.max(1, Number(page ?? 1));
    const topics = Array.isArray(topicsData?.topics) ? topicsData.topics : [];
    const totalItems = topics.length;
    const pageCount = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const safeActivePage = Math.min(activePage, pageCount);
    const start = (safeActivePage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pagedTopics = topics.slice(start, end);
    const topicSummaries = pagedTopics.map((topic: Topic) => ({
      id: topic.id,
      title: topic.topicName,
      link: topic.topicUrl,
    }));

    return {
      props: {
        service,
        variant,
        pageType: TOPIC_PAGE,
        status: 200,
        timeOnServer: Date.now(),
        pathname: context.resolvedUrl,
        topicsData: {
          headline: topicsData.headline,
          summaries: topicSummaries,
          totalItems,
        },
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
