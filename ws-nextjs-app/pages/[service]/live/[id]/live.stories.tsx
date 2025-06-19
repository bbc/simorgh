import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveFixture from '#data/pidgin/live/c7p765ynk9qt.json';
import liveFixtureWithLiveMedia from '#data/mundo/live/c7dkx155e626t.json';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import Live, { ComponentProps } from './LivePageLayout';

const mockLiveData =
  liveFixtureWithLiveMedia.data as ComponentProps['pageData'];

const mockPageData = {
  ...liveFixture.data,
  liveTextStream: {
    content: postFixture,
    contributors: 'Not a random dude',
  },
  someResponse: {
    block: 'Its a block',
  },
  metadata: { atiAnalytics: {} },
  mediaCollections: null,
};

const Component = ({ pageData }: ComponentProps) => (
  <PageLayoutWrapper pageData={pageData} status={200}>
    <Live pageData={pageData} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/Live Page',
  Component,
};

export const Example = () => <Component pageData={mockPageData} />;
export const WithLiveStream = () => <Component pageData={mockLiveData} />;
