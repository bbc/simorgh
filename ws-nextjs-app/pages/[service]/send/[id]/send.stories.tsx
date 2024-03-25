import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import postFixture from './fixture';
import UGCPage from './UGCPageLayout';

const Component = () => (
  // @ts-expect-error partial data required for storybook
  <PageLayoutWrapper pageData={postFixture} status={200}>
    <UGCPage pageData={postFixture} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/UGC Page',
  Component,
};

export const Example = Component;
