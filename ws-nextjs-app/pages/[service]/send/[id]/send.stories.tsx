import React, { PropsWithChildren } from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import UGCPage from './UGCPageLayout';
import { FormScreen, PageProps } from './types';

const NextRouterWrapper = ({ children }: PropsWithChildren) => (
  <RouterContext.Provider
    value={{ query: { id: '123' } } as unknown as NextRouter}
  >
    {children}
  </RouterContext.Provider>
);

const Component = ({
  initialScreen = 'form',
}: {
  initialScreen: FormScreen;
}) => (
  <NextRouterWrapper>
    <PageLayoutWrapper
      // @ts-expect-error partial data required for storybook
      pageData={mundoFormFixture}
      status={200}
    >
      <UGCPage
        initialScreen={initialScreen}
        pageData={mundoFormFixture as PageProps['pageData']}
      />
    </PageLayoutWrapper>
  </NextRouterWrapper>
);

export default {
  title: 'Pages/UGC Page',
  Component,
};

export const Form = () => <Component initialScreen="form" />;
export const Uploading = () => <Component initialScreen="uploading" />;
export const Success = () => <Component initialScreen="success" />;
