import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';

const LanguagesPageLayout = dynamic(() => import('./LanguagesPageLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: {
        metadata: {
          type: STATIC_PAGE,
        },
      },
      pageType: STATIC_PAGE,
      pathname: context.resolvedUrl,
      service: 'ws',
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
    },
  };
};

export default LanguagesPageLayout;
