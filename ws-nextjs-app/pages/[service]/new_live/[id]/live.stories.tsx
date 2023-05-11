import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import Live from './LivePageLayout';

const mockPageData = {
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
