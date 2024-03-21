import React from 'react';
import { bool, element, string, number, object } from 'prop-types';
import variantPropType from '#models/propTypes/variants';
import { pageDataPropType } from '#models/propTypes/data';
import mvtExperimentPropType from '#models/propTypes/mvtExperiment';

// context providers
import ThemeProvider from '#app/components/ThemeProvider';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { ToggleContextProvider } from '../../../contexts/ToggleContext';
import { UserContextProvider } from '../../../contexts/UserContext';
import { EventTrackingContextProvider } from '../../../contexts/EventTrackingContext';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      toggles,
      bbcOrigin,
      status,
      id,
      service,
      isAmp,
      isApp,
      isCaf,
      pageType,
      pathname,
      previousPath,
      variant,
      timeOnServer,
      pageData,
      showAdsBasedOnLocation,
      mvtExperiments,
      isNextJs,
      isUK,
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
            isCaf={isCaf}
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
            isUK={isUK}
          >
            <EventTrackingContextProvider
              atiData={atiAnalytics}
              data={pageData}
            >
              <UserContextProvider>
                <ThemeProvider service={service} variant={variant}>
                  <Component {...props} />
                </ThemeProvider>
              </UserContextProvider>
            </EventTrackingContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  };

  WithContextsContainer.propTypes = {
    bbcOrigin: string,
    derivedPageType: string,
    status: number,
    id: string,
    isAmp: bool.isRequired,
    isApp: bool.isRequired,
    isCaf: bool,
    pageData: pageDataPropType,
    pageType: string.isRequired,
    pathname: string.isRequired,
    previousPath: string,
    service: string.isRequired,
    variant: variantPropType,
    timeOnServer: number,
    showAdsBasedOnLocation: bool,
    // eslint-disable-next-line react/forbid-prop-types
    toggles: object.isRequired,
    mvtExperiments: mvtExperimentPropType,
    isNextJs: bool,
    isUK: bool,
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    derivedPageType: null,
    status: null,
    id: null,
    pageData: null,
    previousPath: null,
    variant: null,
    timeOnServer: null,
    showAdsBasedOnLocation: false,
    mvtExperiments: null,
    isNextJs: false,
    isUK: false,
    isCaf: false,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
