import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import UGCPage from './UGCPageLayout';

const Component = () => (
  // @ts-expect-error partial data required for storybook
  <PageLayoutWrapper pageData={mundoFormFixture} status={200}>
    <UGCPage pageData={mundoFormFixture} />
  </PageLayoutWrapper>
);

export default {
  title: 'Pages/UGC Page',
  Component,
};

export const Example = Component;
