import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { TOPIC_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import deriveVariant from '#nextjs/utilities/deriveVariant';
import { TopicsData } from '#app/lib/config/fixtures/types';
import afriqueTopics from '#app/lib/config/fixtures/afrique';
import hausaTopics from '#app/lib/config/fixtures/hausa';

const fixtureMap: Record<string, TopicsData> = {
  afrique: afriqueTopics,
  hausa: hausaTopics,
};

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
    const topicsData = fixtureMap[service];
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
