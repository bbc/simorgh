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

  const defaultMetadata = {
    title: 'BBC World Service – BBC News in 43 Languages Worldwide',
    description:
      'Broadcasting trusted BBC News and programmes in 43 languages worldwide - on radio, TV, apps, and digital platforms.',
    image:
      'https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1200x630.png',
    imageAltText: 'BBC World Service Image',
    imageWidth: 1200,
    imageHeight: 630,
  };

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
      ...defaultMetadata,
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
          ...defaultMetadata,
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
      status: data.status,
      toggles,
      pageData: {
        ...data?.pageData,
        title: data?.pageData?.title || defaultMetadata.title,
        description: data?.pageData?.description || defaultMetadata.description,
        image: data?.pageData?.image || defaultMetadata.image,
        imageAltText:
          data?.pageData?.imageAltText || defaultMetadata.imageAltText,
        imageWidth: data?.pageData?.imageWidth || defaultMetadata.imageWidth,
        imageHeight: data?.pageData?.imageHeight || defaultMetadata.imageHeight,
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
