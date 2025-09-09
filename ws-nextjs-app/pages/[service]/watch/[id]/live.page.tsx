import React from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { LIVE_TV_PAGE, HOME_PAGE } from '#app/routes/utils/pageTypes';
import PageDataParams from '#app/models/types/pageDataParams';
import isLive from '#app/lib/utilities/isLive';
import { Services, PageTypes } from '#app/models/types/global';
import getPageData from '../../../../utilities/pageRequests/getPageData';

const HomePage = dynamic(() => import('#pages/HomePage/HomePage'));
const LiveTvLayout = dynamic(() => import('./LiveTvLayout'));

export const getServerSideProps: GetServerSideProps = async context => {
  context.res.setHeader(
    'Cache-Control',
    'public, stale-if-error=300, stale-while-revalidate=120, max-age=30',
  );
  const { renderer_env: rendererEnv, service } =
    context.query as PageDataParams;
  const baseProps = {
    error: null,
    isAmp: false,
    isNextJs: true,
    page: null,
    status: 200,
    timeOnServer: Date.now(),
    pageType: LIVE_TV_PAGE as PageTypes,
    service,
    pageData: {
      metadata: {
        type: LIVE_TV_PAGE,
        atiAnalytics: {},
      },
    },
    pathname: context?.resolvedUrl,
  };
  // const { data, toggles } = await getPageData({
  //   service,
  //   rendererEnv,
  //   resolvedUrl: context?.resolvedUrl,
  //   pageType: LIVE_TV_PAGE,
  // });
  // if (data?.error) {
  //   return {
  //     props: {
  //       ...baseProps,
  //       error: data?.error,
  //       status: data?.status,
  //       pageType: LIVE_TV_PAGE,
  //       service: 'dari',
  //       toggles,
  //       pageData: {
  //         metadata: {
  //           type: LIVE_TV_PAGE,
  //           atiAnalytics: {},
  //         },
  //       },
  //     },
  //   };
  // }
  return {
    props: {
      ...baseProps,
      // pageData: {
      //   ...data?.pageData,
      // },
    },
  };
};

export default function LiveTvPage({ ...props }) {
  return <LiveTvLayout {...props} />;
}
