import React from 'react';
import { bool, element, string, number, object } from 'prop-types';
import path from 'ramda/src/path';
import variantPropType from '#models/propTypes/variants';
import { pageDataPropType } from '#models/propTypes/data';

// context providers
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { UserContextProvider } from '#contexts/UserContext';
import { EventContextProvider } from '#contexts/EventContext';

const WithContexts = Component => {
  debugger;
  const WithContextsContainer = props => {
    const {
      toggles,
      bbcOrigin,
      status,
      id,
      service,
      isAmp,
      pageType,
      pathname,
      previousPath,
      variant,
      timeOnServer,
      pageData,
      showAdsBasedOnLocation,
    } = props;
    debugger;
    return (
      <ToggleContextProvider toggles={toggles}>
        <ServiceContextProvider
          service={service}
          variant={variant}
          pageLang={path(['metadata', 'language'], pageData)}
        >
          <RequestContextProvider
            bbcOrigin={bbcOrigin}
            id={id}
            isAmp={isAmp}
            pageType={pageType}
            service={service}
            statusCode={status}
            pathname={pathname}
            previousPath={previousPath}
            variant={variant}
            timeOnServer={timeOnServer}
            showAdsBasedOnLocation={showAdsBasedOnLocation}
          >
            <EventContextProvider>
              <UserContextProvider>
                <Component {...props} />
              </UserContextProvider>
            </EventContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
      </ToggleContextProvider>
    );
  };

  WithContextsContainer.propTypes = {
    bbcOrigin: string,
    status: number,
    id: string,
    isAmp: bool.isRequired,
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
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    status: null,
    id: null,
    pageData: null,
    previousPath: null,
    variant: null,
    timeOnServer: null,
    showAdsBasedOnLocation: false,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
