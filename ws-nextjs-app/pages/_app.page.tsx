import React from 'react';
import type { AppProps } from 'next/app';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';
import { UserContextProvider } from '#app/contexts/UserContext';
import ErrorPage from '#pages/ErrorPage/ErrorPage';
import {
  PageTypes,
  Services,
  Toggles,
  Variants,
} from '#app/models/types/global';
import PageWrapper from '../../src/app/components/PageLayoutWrapper';

interface Props extends AppProps {
  pageProps: {
    bbcOrigin?: string;
    id?: string;
    isAmp: boolean;
    isApp?: boolean;
    isNextJs: boolean;
    mvtExperiments: {
      experimentName: string;
      variation: string;
      type: 'experiment' | 'feature';
    } | null;
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
    variant: Variants;
  };
}

export default function App({ Component, pageProps }: Props) {
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
          <EventTrackingContextProvider pageData={pageData}>
            <UserContextProvider>
              <PageWrapper pageData={pageData} status={status}>
                {status === 200 ? (
                  <Component {...pageProps} />
                ) : (
                  <ErrorPage errorCode={status} />
                )}
              </PageWrapper>
            </UserContextProvider>
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
}
