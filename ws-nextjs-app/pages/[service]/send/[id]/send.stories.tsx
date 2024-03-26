import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import formFixture from './fixture';
import UGCPage from './UGCPageLayout';

const Component = () => (
  // @ts-expect-error partial data required for storybook
  <PageLayoutWrapper pageData={formFixture} status={200}>
    <UGCPage pageData={formFixture} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/UGC Page',
  Component,
};

export const Example = Component;
