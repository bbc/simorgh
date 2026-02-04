import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import { Topic } from '#app/lib/config/fixtures/types';

export default async (context: GetServerSidePropsContext) => {
  const { service, page } = context.query as PageDataParams;
  const safePage = page ?? null;
  const validServices = ['afrique', 'hausa'];

  if (!validServices.includes(service)) {
    context.res.statusCode = 404;

    return {
      props: {
        service,
        status: 404,
        timeOnServer: Date.now(),
        page: safePage,
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
    const activePage = Math.max(1, Number(safePage ?? 1));
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
        pageType: TOPIC_PAGE,
        status: 200,
        timeOnServer: Date.now(),
        pathname: context.resolvedUrl,
        page: safePage,
        activePage,
        pageCount,
        safeActivePage,
        pageData: {
          headline: topicsData.headline,
          summaries: topicSummaries,
          totalItems,
          metadata: {
            type: TOPIC_PAGE,
          },
        },
      },
    };
  } catch {
    context.res.statusCode = 404;
    return {
      props: {
        service,
        status: 404,
        timeOnServer: Date.now(),
      },
    };
  }
};
