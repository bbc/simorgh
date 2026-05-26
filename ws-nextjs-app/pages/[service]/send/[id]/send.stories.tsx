import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { NextRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import hausaClosedFormFixture from '#data/hausa/send/u143732177.json';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import somaliFormFixture from '#data/somali/send/u130092370.json';
import { FormScreen, PageProps } from './types';
import UGCPage from './UGCPageLayout';

const NextRouterWrapper = ({ children }: PropsWithChildren) => (
  <RouterContext.Provider
    value={{ query: { id: '123' } } as unknown as NextRouter}
  >
    {children}
  </RouterContext.Provider>
);

const Component = ({
  initialScreen = 'form',
  fixtureData,
}: {
  initialScreen: FormScreen;
  // biome-ignore lint/suspicious/noExplicitAny: we want this
  fixtureData: any;
}) => {
  const { data } = fixtureData;

  return (
    <NextRouterWrapper>
      <PageLayoutWrapper pageData={data} status={200}>
        <UGCPage
          initialScreen={initialScreen}
          pageData={data as PageProps['pageData']}
        />
      </PageLayoutWrapper>
    </NextRouterWrapper>
  );
};

export default {
  title: 'Pages/UGC Page',
  Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Form = () => (
  <Component initialScreen="form" fixtureData={mundoFormFixture} />
);
export const FormWithFileUpload = () => (
  <Component initialScreen="form" fixtureData={somaliFormFixture} />
);
export const UploadingScreen = () => (
  <Component initialScreen="uploading" fixtureData={mundoFormFixture} />
);
export const SuccessScreen = () => (
  <Component initialScreen="success" fixtureData={mundoFormFixture} />
);
export const ErrorScreen = () => (
  <Component initialScreen="error" fixtureData={mundoFormFixture} />
);
export const ClosedScreen = () => (
  <Component initialScreen="form" fixtureData={hausaClosedFormFixture} />
);
