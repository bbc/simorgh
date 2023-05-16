import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import Live from './LivePageLayout';
import postFixture from '../../../../fixtures/postFixture.json';

const mockPageData = {
  pageCount: 10,
  activePage: 1,
  title: 'Live Page Title',
  description: 'Live page description',
  someResponse: {
    block: 'Its a block',
  },
  posts: postFixture,
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
