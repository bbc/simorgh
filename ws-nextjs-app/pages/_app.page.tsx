import { AppProps } from 'next/app';
import { ATIData } from '#app/components/ATIAnalytics/types';
import ThemeProvider from '#app/components/ThemeProvider';
import ThemeProviderSCSSModules from '#app/components/ThemeProviderSCSSModules';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import {
  PageTypes,
  Services,
  Toggles,
  Variants,
  ServerSideExperiment,
  Navigation,
} from '#app/models/types/global';
import ErrorPage from '#app//pages/ErrorPage/ErrorPage';
import PageWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';
import { UserContextProvider } from '#app/contexts/UserContext';
import { AccountProvider } from '#app/contexts/AccountContext';
import { ReverbParamsContextProvider } from '#app/contexts/ReverbParamsContext';
import QueryProvider from '#app/contexts/QueryContext';
import { IdctaConfig } from '#app/models/types/account';

interface Props {
  pageProps: {
    bbcOrigin?: string;
    cspHeader?: string | null;
    id?: string;
    isAmp: boolean;
    isApp?: boolean;
    isLite?: boolean;
    isNextJs: boolean;
    isAvEmbeds?: boolean;
    nonce?: string | null;
    serverSideExperiments: ServerSideExperiment[] | null;
    pageData: {
      metadata: {
        type: PageTypes;
        atiAnalytics?: ATIData;
      };
      primaryMediaType?: string | null;
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
    navItems: Navigation[] | null;
    variant?: Variants;
    isUK?: boolean;
    country?: string | null;
    idctaConfig: IdctaConfig | null;
  };
}

export default function CustomApp({
  Component,
  pageProps,
}: AppProps<Props['pageProps']>) {
  if (!pageProps.service) {
    return <Component {...pageProps} />;
  }

  const {
    bbcOrigin,
    cspHeader = null,
    id,
    isAmp,
    isApp = false,
    isLite = false,
    isNextJs = true,
    isAvEmbeds = false,
    nonce = null,
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
    idctaConfig = null,
    navItems,
  } = pageProps;

  const {
    metadata: { atiAnalytics = undefined } = {},
    primaryMediaType = null,
  } = pageData ?? {};

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
          cspHeader={cspHeader}
          id={id}
          isAmp={isAmp}
          isApp={isApp}
          isLite={isLite}
          nonce={nonce}
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
          primaryMediaType={primaryMediaType}
        >
          <AccountProvider initialConfig={idctaConfig}>
            <ReverbParamsContextProvider metadata={pageData?.metadata}>
              <EventTrackingContextProvider atiData={atiAnalytics}>
                {isAvEmbeds ? (
                  <ThemeProvider service={service} variant={variant}>
                    {RenderChildrenOrError}
                  </ThemeProvider>
                ) : (
                  <QueryProvider>
                    <UserContextProvider>
                      <ThemeProviderSCSSModules
                        service={service}
                        variant={variant}
                      >
                        <ThemeProvider service={service} variant={variant}>
                          <PageWrapper
                            navItems={navItems}
                            pageData={pageData}
                            status={status}
                          >
                            {RenderChildrenOrError}
                          </PageWrapper>
                        </ThemeProvider>
                      </ThemeProviderSCSSModules>
                    </UserContextProvider>
                  </QueryProvider>
                )}
              </EventTrackingContextProvider>
            </ReverbParamsContextProvider>
          </AccountProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
}
