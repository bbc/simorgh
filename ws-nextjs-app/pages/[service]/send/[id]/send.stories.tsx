import React, { PropsWithChildren } from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import postFixture from './fixture';
import UGCPage from './UGCPageLayout';
import { PageProps } from './types';

const NextRouterWrapper = ({ children }: PropsWithChildren) => (
  <RouterContext.Provider
    value={{ query: { id: '123' } } as unknown as NextRouter}
  >
    {children}
  </RouterContext.Provider>
);

const Component = () => (
  <NextRouterWrapper>
    <PageLayoutWrapper
      // @ts-expect-error partial data required for storybook
      pageData={postFixture}
      status={200}
    >
      <UGCPage pageData={postFixture as PageProps['pageData']} />
    </PageLayoutWrapper>
  </NextRouterWrapper>
);

export default {
  title: 'Pages/UGC Page',
  Component,
};

export const Example = Component;
