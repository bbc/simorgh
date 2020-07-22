import React from 'react';
import { bool, element, string, number, shape } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import variantPropType from '#models/propTypes/variants';
import { pageDataPropType } from '#models/propTypes/data';

// context providers
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { UserContextProvider } from '#contexts/UserContext';
import { EventContextProvider } from '#contexts/EventContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      remoteConfig,
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
    } = props;

    const remoteToggles = pathOr(null, ['toggles'], remoteConfig);

    return (
      <ToggleContextProvider
        remoteToggles={remoteToggles}
        service={service}
        origin={bbcOrigin}
      >
        <ServiceContextProvider
          service={service}
          variant={variant}
          pathname={pathname}
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
    remoteConfig: shape({
      toggles: shape({
        ads: shape({
          enabled: bool.isRequired,
        }),
      }),
    }),
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    status: null,
    id: null,
    pageData: null,
    previousPath: null,
    variant: null,
    timeOnServer: null,
    remoteConfig: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
