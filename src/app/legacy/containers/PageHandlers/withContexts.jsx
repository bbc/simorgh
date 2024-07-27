import React from 'react';

// context providers
import { ThemeProvider } from '../../../components/ThemeProvider';
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
      isCaf = false,
      pageType,
      pathname,
      previousPath = null,
      variant = null,
      timeOnServer = null,
      pageData = null,
      showAdsBasedOnLocation = false,
      showCookieBannerBasedOnCountry = true,
      mvtExperiments = null,
      isNextJs = false,
      isUK = false,
    } = props;

    const { metadata: { atiAnalytics } = {} } = pageData ?? {};

    return (
      <ThemeProvider service={service} variant={variant}>
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
              isCaf={isCaf}
              pageType={pageType}
              service={service}
              statusCode={status}
              pathname={pathname}
              previousPath={previousPath}
              variant={variant}
              timeOnServer={timeOnServer}
              showAdsBasedOnLocation={showAdsBasedOnLocation}
              showCookieBannerBasedOnCountry={showCookieBannerBasedOnCountry}
              mvtExperiments={mvtExperiments}
              isNextJs={isNextJs}
              isUK={isUK}
            >
              <EventTrackingContextProvider
                atiData={atiAnalytics}
                data={pageData}
              >
                <UserContextProvider>
                  <Component {...props} />
                </UserContextProvider>
              </EventTrackingContextProvider>
            </RequestContextProvider>
          </ServiceContextProvider>
        </ToggleContextProvider>
      </ThemeProvider>
    );
  };

  return WithContextsContainer;
};

export default WithContexts;
