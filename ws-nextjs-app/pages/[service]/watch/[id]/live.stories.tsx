import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveTvFixture from '#data/dari/watch/bbc_afghan_tv/live.json';
import LiveTvLayout from './LiveTvPageLayout';
import { LiveTVPageProps } from './types';

const Component = ({ pageData }: LiveTVPageProps) => (
  <PageLayoutWrapper pageData={pageData} status={200}>
    <LiveTvLayout
      pageData={pageData}
      pageType="liveTV"
      pathname=""
      service=""
      status={0}
      timeOnServer={0}
    />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/Live TV Page',
  Component,
};

// @ts-expect-error partial data required for storybook
export const Example = () => <Component pageData={liveTvFixture.data} />;
