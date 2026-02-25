import App, { AppContext } from 'next/app';
import { ATIData } from '#app/components/ATIAnalytics/types';
import ThemeProvider from '#app/components/ThemeProvider';
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
import extractHeaders from '#src/server/utilities/extractHeaders';
import { getServerExperiments } from '#src/server/utilities/experimentHeader';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import getPathExtension from '#app/utilities/getPathExtension';
import parseRoute from '#app/routes/utils/parseRoute';
import addCspHeader from '#nextjs/utilities/addCspHeader';
import derivePageType from '#nextjs/utilities/derivePageType';
import addServiceChainHeader from '#nextjs/utilities/addServiceChainHeader';
import addOnionLocationHeader from '#nextjs/utilities/addOnionLocationHeader';
import addVaryHeader from '#nextjs/utilities/addVaryHeader';
import addLinkHeader from '#nextjs/utilities/addLinkHeader';
import { AccountProvider } from '#app/contexts/AccountContext';
import getIdctaConfig from '#app/lib/idcta/getIdctaConfig';
import { IdctaConfig } from '#app/models/types/account';
import fetchConfig from '#app/lib/utilities/fetchConfig';

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
    initialIsSignedIn?: boolean;
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

    const cookieHeader = ctx.req?.headers?.cookie;
    const idctaResult = await getIdctaConfig(toggles, service, cookieHeader);

    const initialIsSignedIn = idctaResult?.initialIsSignedIn ?? false;
    const idctaConfig = idctaResult
      ? { ...idctaResult, initialIsSignedIn: undefined }
      : null;

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
        idctaConfig,
        navItems,
        initialIsSignedIn,
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
      initialIsSignedIn = false,
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
            <AccountProvider
              initialConfig={idctaConfig}
              initialIsSignedIn={initialIsSignedIn}
            >
              <EventTrackingContextProvider atiData={atiAnalytics}>
                {isAvEmbeds ? (
                  <ThemeProvider service={service} variant={variant}>
                    {RenderChildrenOrError}
                  </ThemeProvider>
                ) : (
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
                )}
              </EventTrackingContextProvider>
            </AccountProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  }
}
