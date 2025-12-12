import type { AppContext, AppProps } from 'next/app';
import { NextPageContext } from 'next/types';
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
import extractHeaders from '#src/server/utilities/extractHeaders';
import getToggles from '#app/lib/utilities/getToggles/withCache';
import addCspHeader from '#nextjs/utilities/addCspHeader';
import getPathExtension from '#app/utilities/getPathExtension';
import derivePageType from '#nextjs/utilities/derivePageType';
import { getServerExperiments } from '#src/server/utilities/experimentHeader';
import addServiceChainHeader from '#nextjs/utilities/addServiceChainHeader';
import addOnionLocationHeader from '#nextjs/utilities/addOnionLocationHeader';
import addVaryHeaders from '#nextjs/utilities/addVaryHeader';

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

// This runs on the server before rendering the page.
// The props returned are passed down to ALL pages and merged with page
// specific props from getInitialProps / getServerSideProps
App.getInitialProps = async ({ ctx }: AppContext) => {
  const { req, asPath } = ctx as NextPageContext;

  const { isApp, isAmp, isLite } = getPathExtension(asPath || '');

  const routeSegments = asPath?.split('/')?.filter(Boolean);

  const [service] = (routeSegments || []) as [Services];

  const toggles = await getToggles(service);

  const pageType = derivePageType(asPath || '');

  const serverSideExperiments = getServerExperiments({
    headers: ctx.req?.headers || {},
    service,
    pageType,
  });

  addServiceChainHeader({ ctx });
  addCspHeader({ ctx, service, toggles });
  addOnionLocationHeader({ ctx });
  addVaryHeaders({ ctx, serverSideExperiments });

  return {
    pageProps: {
      ...extractHeaders(req?.headers || {}),
      isApp,
      isAmp,
      isLite,
      isNextJs: true,
      toggles,
      serverSideExperiments,
    },
  };
};
