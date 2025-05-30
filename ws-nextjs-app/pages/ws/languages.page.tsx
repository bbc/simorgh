import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import { LanguagesPageProps } from './types';

const HomePage = dynamic(() => import('#pages/HomePage'));
const LanguagesPageLayout = dynamic(() => import('./LanguagesPageLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const isTestEnvironment = context.query.renderer_env === 'test';
  const pageType = isTestEnvironment ? HOME_PAGE : STATIC_PAGE;

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
      pathname: context.resolvedUrl,
      service: isTestEnvironment ? 'pidgin' : 'ws',
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
