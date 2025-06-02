import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData from '#app/routes/homePage/getInitialData';
import { Agent } from 'undici';
import nodeLogger from '#app/lib/logger.node';
import { LanguagesPageProps } from './types';

const logger = nodeLogger(__filename);

const HomePage = dynamic(() => import('#pages/HomePage'));
const LanguagesPageLayout = dynamic(() => import('./LanguagesPageLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const isTestEnvironment = context.query.renderer_env === 'test';
  const pageType = isTestEnvironment ? HOME_PAGE : STATIC_PAGE;
  const service = isTestEnvironment ? 'pidgin' : 'ws';

  if (isTestEnvironment) {
    const initialData = await getInitialData({
      service,
      path: '/pidgin',
      // path: context?.resolvedUrl,
      pageType,
      variant: undefined,
      getAgent: () => Promise.resolve({} as Agent),
    });

    if (initialData?.error) {
      logger.info('Initial data error: ', initialData);
      context.res.statusCode = initialData.status;
      return {
        props: {
          error: initialData?.error,
          isAmp: false,
          isNextJs: true,
          page: null,
          pageData: {
            metadata: {
              type: pageType,
            },
          },
          pageType,
          pathname: context?.resolvedUrl,
          service,
          status: initialData?.status,
          timeOnServer: Date.now(),
          isTestEnvironment,
        },
      };
    }

    return {
      props: {
        error: null,
        isAmp: false,
        isNextJs: true,
        page: null,
        pageData: initialData?.pageData,
        pageType,
        pathname: '/pidgin',
        // pathname: context?.resolvedUrl,
        service,
        status: initialData?.status,
        timeOnServer: Date.now(),
        isTestEnvironment,
      },
    };
  }

  return {
    props: {
      error: null,
      isAmp: false,
      isNextJs: true,
      page: null,
      pageData: {
        metadata: {
          type: pageType,
        },
      },
      pageType,
      pathname: context?.resolvedUrl,
      service,
      status: 200,
      timeOnServer: Date.now(), // TODO: check if needed?
      isTestEnvironment,
    },
  };
};

export default function LanguagesPage({ ...props }: LanguagesPageProps) {
  if (props.isTestEnvironment) {
    return <HomePage pageData={props.pageData} />;
  }
  return <LanguagesPageLayout />;
}
