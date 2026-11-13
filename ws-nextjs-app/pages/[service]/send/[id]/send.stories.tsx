import { PropsWithChildren, useMemo } from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { AccountContext } from '#app/contexts/AccountContext';
import { AccountContextProps } from '#app/models/types/account';
import { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import mundoFormFixture from '#data/mundo/send/test2qq3x8vt.json';
import somaliFormFixture from '#data/somali/send/u130092370.json';
import swahiliFormFixture from '#data/swahili/send/u244742000.json';
import hausaClosedFormFixture from '#data/hausa/send/u143732177.json';
import hindiFormFixture from '#data/hindi/send/u99999999.json';
import UGCPage from './UGCPageLayout';
import { FormScreen, PageProps } from './types';

const NextRouterWrapper = ({ children }: PropsWithChildren) => {
  const router = useMemo(
    () => ({ query: { id: '123' } }) as unknown as NextRouter,
    [],
  );

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

const Component = ({
  initialScreen = 'form',
  fixtureData,
}: {
  initialScreen: FormScreen;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const FormWithMultipleSections = () => (
  <Component initialScreen="form" fixtureData={swahiliFormFixture} />
);
export const HindiAmaForm = () => (
  <Component initialScreen="form" fixtureData={hindiFormFixture} />
);
export const HindiAmaFormSignedIn = () => (
  <AccountContext.Provider
    value={
      {
        isIdctaAvailable: true,
        isRefreshAvailable: true,
        isSignedIn: true,
        signInUrl: '',
        registerUrl: '',
        isArticlePersonalizationEnabled: false,
        isArticlePersonalizationAvailable: false,
        isTopicPersonalizationEnabled: false,
        isTopicPersonalizationAvailable: false,
        isPersonalisationOn: false,
      } satisfies AccountContextProps
    }
  >
    <Component initialScreen="form" fixtureData={hindiFormFixture} />
  </AccountContext.Provider>
);
