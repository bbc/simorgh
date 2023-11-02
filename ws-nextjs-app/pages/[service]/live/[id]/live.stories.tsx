import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveFixture from '#data/pidgin/livePage/c7p765ynk9qt.json';
import postFixture from '#data/pidgin/posts/postFixtureCleaned.json';
import Live from './LivePageLayout';

const mockPageData = {
  ...liveFixture.data,
  liveTextStream: {
    content: postFixture,
  },
  someResponse: {
    block: 'Its a block',
  },
};

const Component = () => (
  // @ts-expect-error partial data required for storybook
  <PageLayoutWrapper pageData={mockPageData} status={200}>
    <Live pageData={mockPageData} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/Live Page',
  Component,
};

export const Example = Component;
