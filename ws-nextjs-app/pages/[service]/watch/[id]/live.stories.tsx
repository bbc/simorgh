import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveTvFixture from '#data/dari/watch/bbc_afghan_tv/live.json';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import LiveTvLayout from './LiveTvPageLayout';
import { LiveTVPageProps } from './types';

const service = 'dari' as Services;

const Component = ({ pageData }: LiveTVPageProps) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      pageType={LIVE_TV_PAGE}
      pathname=""
      service={service}
    >
      <PageLayoutWrapper pageData={pageData} status={200}>
        {/* @ts-expect-error partial data required for storybook */}
        <LiveTvLayout pageData={pageData} />
      </PageLayoutWrapper>
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Pages/Live TV Page',
  Component,
};

export const Example = () => (
  // @ts-expect-error partial data required for storybook
  <Component pageData={liveTvFixture.data} />
);
