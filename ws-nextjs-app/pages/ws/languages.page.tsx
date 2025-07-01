import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE } from '#app/routes/utils/pageTypes';
import { Services, PageTypes } from '#app/models/types/global';

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
      status: 200,
      timeOnServer: Date.now(),
      pageType: STATIC_PAGE as PageTypes,
      service: 'ws' as Services,
      pageData: {
        metadata: {
          type: STATIC_PAGE,
        },
      },
      pathname: context?.resolvedUrl,
    },
  };
};

export default LanguagesPageLayout;
