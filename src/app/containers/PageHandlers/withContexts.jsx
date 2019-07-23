import React from 'react';
import { bool, element, objectOf, string } from 'prop-types';

// context providers
import { DialContextProvider } from '../../contexts/DialContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      bbcOrigin,
      id,
      service,
      serviceVariant,
      isAmp,
      pageType,
      previousPath,
      dials,
    } = props;
    return (
      <ToggleContextProvider>
        <DialContextProvider dials={dials}>
          <ServiceContextProvider service={service} variant={serviceVariant}>
            <RequestContextProvider
              bbcOrigin={bbcOrigin}
              id={id}
              isAmp={isAmp}
              pageType={pageType}
              service={service}
              previousPath={previousPath}
            >
              <Component {...props} />
            </RequestContextProvider>
          </ServiceContextProvider>
        </DialContextProvider>
      </ToggleContextProvider>
    );
  };

  WithContextsContainer.propTypes = {
    bbcOrigin: string,
    id: string,
    isAmp: bool.isRequired,
    pageType: string.isRequired,
    previousPath: string,
    service: string.isRequired,
    serviceVariant: string,
    dials: objectOf(bool).isRequired,
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    id: null,
    previousPath: null,
    serviceVariant: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
