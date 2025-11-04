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

  const { renderer_env: rendererEnv } = context.query as PageDataParams;

  const baseProps = {
    error: null,
    isAmp: false,
    isNextJs: true,
    page: null,
    status: 200,
    timeOnServer: Date.now(),
    pageType: STATIC_PAGE as PageTypes,
    service: 'ws' as Services,
    pathname: context?.resolvedUrl,
    pageData: {
      metadata: {
        type: STATIC_PAGE,
        atiAnalytics: {},
      },
    },
  };

  if (isLive()) {
    return {
      props: baseProps,
    };
  }

  const { data, toggles } = await getPageData({
    service: 'ws',
    rendererEnv,
    resolvedUrl: '/ws/languages',
    pageType: HOME_PAGE,
  });

  if (data?.error) {
    return {
      props: {
        ...baseProps,
        error: data?.error,
        status: data?.status,
        pageType: HOME_PAGE,
        service: 'ws',
        toggles,
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
      service: 'ws',
      pathname: '/ws/languages',
      status: data?.status,
      toggles,
      pageData: {
        ...data?.pageData,
        metadata: {
          ...data?.pageData?.metadata,
          type: HOME_PAGE,
          atiAnalytics: {
            ...data?.pageData?.metadata?.atiAnalytics,
            pageIdentifier: 'ws.languages.page',
          },
        },
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
