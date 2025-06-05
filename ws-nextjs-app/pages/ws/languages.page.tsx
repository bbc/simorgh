import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { STATIC_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import isLive from '#app/lib/utilities/isLive';
import { Services, PageTypes } from '#app/models/types/global';
import getPageData from '../../utilities/pageRequests/getPageData';
import { LanguagesPageProps } from './types';

const HomePage = dynamic(() => import('#pages/HomePage/HomePage'));
const LanguagesPageLayout = dynamic(() => import('./LanguagesPageLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );

  const { id, renderer_env: rendererEnv } = context.query as PageDataParams;
  const baseProps = {
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
        atiAnalytics: {},
      },
    },
    pathname: context?.resolvedUrl,
  };

  if (isLive()) {
    return {
      props: baseProps,
    };
  }

  const { data } = await getPageData({
    id,
    service: 'pidgin',
    rendererEnv,
    resolvedUrl: '/pidgin',
    pageType: HOME_PAGE,
  });

  if (data?.error) {
    return {
      props: {
        ...baseProps,
        error: data?.error,
        status: data?.status,
        pageType: HOME_PAGE,
        service: 'pidgin',
        pageData: {
          metadata: {
            type: HOME_PAGE,
            atiAnalytics: {},
          },
        },
      },
    };
  }

  return {
    props: {
      ...baseProps,
      pageType: HOME_PAGE,
      service: 'pidgin',
      pathname: '/pidgin',
      status: data?.status,
      pageData: {
        ...data?.pageData,
      },
    },
  };
};

export default function LanguagesPage({ ...props }: LanguagesPageProps) {
  if (isLive()) {
    return <LanguagesPageLayout />;
  }
  return <HomePage pageData={props.pageData} />;
}
