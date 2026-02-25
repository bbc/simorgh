import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { DOWNLOADS_PAGE } from '#app/routes/utils/pageTypes';
import logResponseTime from '#server/utilities/logResponseTime';
import data from './data.json';

const testingPageLayout = dynamic(() => import('./testingPageLayout'));

const pageTitle = 'Hello';

export const getServerSideProps: GetServerSideProps = async context => {
  logResponseTime(
    {
      path: context.resolvedUrl,
    },
    context.res,
    () => null,
  );
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=600, stale-while-revalidate=240, max-age=60',
  );

  return {
    props: {
      error: null,
      pageData: {
        data,
        metadata: {
          type: DOWNLOADS_PAGE,
          pageTitle,
        },
      },
      pageType: DOWNLOADS_PAGE,
      pathname: `ws/testing`,
      service: 'mundo',
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      variant: null,
    },
  };
};

export default testingPageLayout;
