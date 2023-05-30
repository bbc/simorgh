import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import liveFixture from '#data/pidgin/livePage/c7p765ynk9qt.json';
import Live from './LivePageLayout';

const mockPageData = {
  ...liveFixture.data,
  pageCount: 10,
  activePage: 1,
  someResponse: {
    block: 'Its a block',
  },
};

const Component = () => (
  <PageLayoutWrapper pageData={mockPageData} status={200}>
    <Live pageData={mockPageData} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/Live Page',
  Component,
};

export const Example = Component;
