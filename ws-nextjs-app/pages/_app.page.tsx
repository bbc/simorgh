import App, { AppContext } from 'next/app';

import ErrorPage from '#app//pages/ErrorPage/ErrorPage';
import { ATIData } from '#app/components/ATIAnalytics/types';
import PageWrapper from '#app/components/PageLayoutWrapper';
import ThemeProvider from '#app/components/ThemeProvider';
import { AccountProvider } from '#app/contexts/AccountContext';
import { EventTrackingContextProvider } from '#app/contexts/EventTrackingContext';
import QueryProvider from '#app/contexts/QueryContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { UserContextProvider } from '#app/contexts/UserContext';
import getIdctaConfig from '#app/lib/idcta/getIdctaConfig';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import { IdctaConfig } from '#app/models/types/account';
import {
  Navigation,
  PageTypes,
  ServerSideExperiment,
  Services,
  Toggles,
  Variants,
} from '#app/models/types/global';
import parseRoute from '#app/routes/utils/parseRoute';
import getPathExtension from '#app/utilities/getPathExtension';
import addCspHeader from '#utilities/addCspHeader';
import addLinkHeader from '#utilities/addLinkHeader';
import addOnionLocationHeader from '#utilities/addOnionLocationHeader';
import addServiceChainHeader from '#utilities/addServiceChainHeader';
import addVaryHeader from '#utilities/addVaryHeader';
import derivePageType from '#utilities/derivePageType';
import { getServerExperiments } from '#utilities/experimentHeader';
import extractHeaders from '#utilities/extractHeaders';

interface Props {
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
    navItems: Navigation[] | null;
    variant?: Variants;
    isUK?: boolean;
    country?: string | null;
    idctaConfig: IdctaConfig | null;
  };
}

export default class CustomApp extends App<Props> {
  // The 'pageProps' returned are passed down to ALL pages and merged with page
  // specific 'pageProps' from their getInitialProps / getServerSideProps functions
  static async getInitialProps({ ctx }: AppContext) {
    const { asPath = '' } = ctx;

    const { isApp, isAmp, isLite } = getPathExtension(asPath);

    const { service, variant } = parseRoute(asPath) as {
      service: Services;
      variant?: Variants;
    };

    const [togglesResult, navResult] = await Promise.allSettled([
      getToggles(service),
      fetchConfig<{ data: { items: Navigation[] } }>({
        service,
        pagePath: asPath,
        configType: 'navigation',
        variant,
      }),
    ]);

    const toggles =
      togglesResult.status === 'fulfilled' ? togglesResult.value : {};

    const navItems =
      navResult.status === 'fulfilled'
        ? (navResult.value?.data?.items ?? null)
        : null;

    const requestHeaders = ctx.req?.headers;
    const idctaResult = await getIdctaConfig(toggles, service, requestHeaders);
    const pageType =
      (ctx.req?.headers['page-type'] as PageTypes) || derivePageType(asPath);
    const serverSideExperiments = getServerExperiments({
      headers: ctx.req?.headers || {},
      service,
      pageType,
    });

    addServiceChainHeader({ ctx });
    addCspHeader({ ctx, service, toggles });
    addOnionLocationHeader({ ctx });
    addVaryHeader({ ctx, serverSideExperiments });
    addLinkHeader({ ctx });

    return {
      pageProps: {
        ...extractHeaders(ctx.req?.headers || {}),
        isApp,
        isAmp,
        isLite,
        isNextJs: true,
        serverSideExperiments,
        toggles,
        idctaConfig: idctaResult,
        navItems,
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;

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
      idctaConfig = null,
      navItems,
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
            showCookieBannerBasedOnCountry={showCookieBannerBasedOnCountry}
            serverSideExperiments={serverSideExperiments}
            country={country}
            isNextJs={isNextJs}
            isUK={isUK ?? false}
          >
            <AccountProvider initialConfig={idctaConfig}>
              <EventTrackingContextProvider atiData={atiAnalytics}>
                {isAvEmbeds ? (
                  <ThemeProvider service={service} variant={variant}>
                    {RenderChildrenOrError}
                  </ThemeProvider>
                ) : (
                  <QueryProvider>
                    <UserContextProvider>
                      <ThemeProvider service={service} variant={variant}>
                        <PageWrapper
                          navItems={navItems}
                          pageData={pageData}
                          status={status}
                        >
                          {RenderChildrenOrError}
                        </PageWrapper>
                      </ThemeProvider>
                    </UserContextProvider>
                  </QueryProvider>
                )}
              </EventTrackingContextProvider>
            </AccountProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  }
}
