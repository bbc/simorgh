import type { AppProps } from 'next/app';
import useIsPWA from '#app/hooks/useIsPWA';
import { useServiceWorkerRegistration } from '#app/hooks/useServiceWorkerRegistration';
import { useSendPWAStatus } from '#app/hooks/useSendPWAStatus';
import { ATIData } from '#app/components/ATIAnalytics/types';
import ThemeProvider from '#app/components/ThemeProvider';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import {
  PageTypes,
  Services,
  Toggles,
  Variants,
  ServerSideExperiment,
} from '#app/models/types/global';
import ErrorPage from '#app//pages/ErrorPage/ErrorPage';
import PageWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';
import { UserContextProvider } from '#app/contexts/UserContext';

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
    showCookieBannerBasedOnCountry?: boolean;
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
    showCookieBannerBasedOnCountry = true,
    status,
    timeOnServer,
    toggles,
    variant,
    isUK,
    country,
  } = pageProps;

  const { metadata: { atiAnalytics = undefined } = {} } = pageData ?? {};

  const isPWA = useIsPWA();

  // Register service worker for offline functionality
  useServiceWorkerRegistration(service);

  // Send PWA status to service worker
  useSendPWAStatus(isPWA);

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
          showCookieBannerBasedOnCountry={showCookieBannerBasedOnCountry}
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
