import React, { PropsWithChildren } from 'react';
import type { AppProps } from 'next/app';
import { ToggleContextProvider } from '../../src/app/contexts/ToggleContext';
import { ServiceContextProvider } from '../../src/app/contexts/ServiceContext';
import { RequestContextProvider } from '../../src/app/contexts/RequestContext';
import { EventTrackingContextProvider } from '../../src/app/contexts/EventTrackingContext';
import { UserContextProvider } from '../../src/app/contexts/UserContext';
import ErrorPage from '../../src/app/pages/ErrorPage/ErrorPage';
import {
  PageTypes,
  Services,
  Toggles,
  Variants,
  MvtExperiment,
} from '../../src/app/models/types/global';
import PageWrapper from '../../src/app/components/PageLayoutWrapper';

interface Props extends AppProps {
  pageProps: {
    bbcOrigin?: string;
    id?: string;
    isAmp: boolean;
    isApp?: boolean;
    isNextJs: boolean;
    mvtExperiments: MvtExperiment[] | null;
    pageData: object;
    pageLang?: string;
    pageType: PageTypes;
    pathname: string;
    previousPath?: string;
    service: Services;
    showAdsBasedOnLocation: boolean;
    status: number;
    timeOnServer?: number;
    toggles: Toggles;
    variant?: Variants;
  };
}

export default function Providers({
  pageProps,
  children,
}: PropsWithChildren<Props>) {
  const {
    bbcOrigin,
    id,
    isAmp,
    isApp = false,
    isNextJs = true,
    mvtExperiments = null,
    pageData,
    pageLang = '',
    pageType,
    pathname,
    previousPath = '',
    service,
    showAdsBasedOnLocation,
    status,
    timeOnServer,
    toggles,
    variant,
  } = pageProps;

  return (
    <ToggleContextProvider toggles={toggles}>
      <ServiceContextProvider
        service={service}
        variant={variant}
        pageLang={pageLang}
      >
        <RequestContextProvider
          bbcOrigin={bbcOrigin}
          id={id}
          isAmp={isAmp}
          isApp={isApp}
          pageType={pageType}
          service={service}
          statusCode={status}
          pathname={pathname}
          previousPath={previousPath}
          variant={variant}
          timeOnServer={timeOnServer}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
          mvtExperiments={mvtExperiments}
          isNextJs={isNextJs}
        >
          <EventTrackingContextProvider data={pageData}>
            <UserContextProvider>
              {/* @ts-expect-error pageData requires metadata.type to be set to page type i.e. LIVE, but pageData is currently declared as an object */}
              <PageWrapper pageData={pageData} status={status}>
                {children}
                {/* {status === 200 ? (
                  <Component {...pageProps} />
                ) : (
                  <ErrorPage errorCode={status || 500} />
                )} */}
              </PageWrapper>
            </UserContextProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
}
