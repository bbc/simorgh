import React from 'react';
import type { AppProps } from 'next/app';
import { ATIData } from '#app/components/ATIAnalytics/types';
import ThemeProvider from '#app/components/ThemeProvider';
import { ToggleContextProvider } from 'simorgh/src/app/contexts/ToggleContext/ToggleContext';
import { ServiceContextProvider } from 'simorgh/src/app/contexts/ServiceContext/ServiceContext';
import { RequestContextProvider } from 'simorgh/src/app/contexts/RequestContext/RequestContext';
import { EventTrackingContextProvider } from 'simorgh/src/app/contexts/EventTrackingContext/EventTrackingContext';
import { UserContextProvider } from 'simorgh/src/app/contexts/UserContext/UserContext';
import ErrorPage from 'simorgh/src/app/pages/ErrorPage/ErrorPage';
import {
  PageTypes,
  Services,
  Toggles,
  Variants,
  ServerSideExperiment,
} from 'simorgh/src/app/models/types/global';
import PageWrapper from 'simorgh/src/app/components/PageLayoutWrapper/PageLayoutWrapper';

interface Props extends AppProps {
  pageProps: {
    bbcOrigin?: string;
    id?: string;
    isAmp: boolean;
    isApp?: boolean;
    isLite?: boolean;
    isNextJs: boolean;
    isAvEmbeds?: boolean;
    serverSideExperiments: ServerSideExperiment[] | null;
    pageData: {
      metadata: {
        type: PageTypes;
        atiAnalytics?: ATIData;
      };
    };
    pageLang?: string;
    pageType: PageTypes;
    pathname: string;
    service: Services;
    showAdsBasedOnLocation: boolean;
    status: number;
    timeOnServer?: number;
    toggles: Toggles;
    variant?: Variants;
    isUK?: boolean;
    country?: string | null;
  };
}

export default function App({ Component, pageProps }: Props) {
  const {
    bbcOrigin,
    id,
    isAmp,
    isApp = false,
    isLite = false,
    isNextJs = true,
    isAvEmbeds = false,
    serverSideExperiments = null,
    pageData,
    pageLang = '',
    pageType,
    pathname,
    service,
    showAdsBasedOnLocation,
    status,
    timeOnServer,
    toggles,
    variant,
    isUK,
    country,
  } = pageProps;

  const { metadata: { atiAnalytics = undefined } = {} } = pageData ?? {};

  const RenderChildrenOrError =
    status === 200 ? (
      <Component {...pageProps} />
    ) : (
      <ErrorPage errorCode={status || 500} />
    );

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
          isLite={isLite}
          pageType={pageType}
          service={service}
          statusCode={status}
          pathname={pathname}
          variant={variant}
          timeOnServer={timeOnServer}
          showAdsBasedOnLocation={showAdsBasedOnLocation}
          serverSideExperiments={serverSideExperiments}
          country={country}
          isNextJs={isNextJs}
          isUK={isUK ?? false}
        >
          <EventTrackingContextProvider atiData={atiAnalytics}>
            {isAvEmbeds ? (
              <ThemeProvider service={service} variant={variant}>
                {RenderChildrenOrError}
              </ThemeProvider>
            ) : (
              <UserContextProvider>
                <ThemeProvider service={service} variant={variant}>
                  <PageWrapper pageData={pageData} status={status}>
                    {RenderChildrenOrError}
                  </PageWrapper>
                </ThemeProvider>
              </UserContextProvider>
            )}
          </EventTrackingContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
}
