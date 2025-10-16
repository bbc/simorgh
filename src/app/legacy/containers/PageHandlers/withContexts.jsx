import React from 'react';

// context providers
import { ThemeProvider } from '../../../components/ThemeProvider';
import ThemeProviderSCSSModules from '../../../components/ThemeProviderSCSSModules';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';
import { UserContextProvider } from '../../../contexts/UserContext';
import { EventTrackingContextProvider } from '../../../contexts/EventTrackingContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      toggles,
      bbcOrigin = null,
      status = null,
      id = null,
      service,
      isAmp = false,
      isApp = false,
      isLite = false,
      pageType,
      pathname,
      variant = null,
      timeOnServer = null,
      pageData = null,
      showAdsBasedOnLocation = false,
      showCookieBannerBasedOnCountry = true,
      serverSideExperiments = null,
      isNextJs = false,
      isUK = false,
      country = null,
      nonce = null,
      cspHeader = null,
    } = props;

    const { metadata: { atiAnalytics } = {} } = pageData ?? {};

    return (
      <ToggleContextProvider toggles={toggles}>
        <ServiceContextProvider
          service={service}
          variant={variant}
          pageLang={pageData?.metadata?.language}
        >
          <RequestContextProvider
            bbcOrigin={bbcOrigin}
            derivedPageType={pageData?.metadata?.type}
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
            isNextJs={isNextJs}
            isUK={isUK}
            country={country}
            nonce={nonce}
            cspHeader={cspHeader}
          >
            <EventTrackingContextProvider
              atiData={atiAnalytics}
              data={pageData}
            >
              <UserContextProvider>
                <ThemeProviderSCSSModules service={service} variant={variant}>
                  <ThemeProvider service={service} variant={variant}>
                    <Component {...props} />
                  </ThemeProvider>
                </ThemeProviderSCSSModules>
              </UserContextProvider>
            </EventTrackingContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  };

  return WithContextsContainer;
};

export default WithContexts;
