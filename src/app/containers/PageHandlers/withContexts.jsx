import React from 'react';
import { bool, element, objectOf, string, oneOf } from 'prop-types';

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
      variant,
      isAmp,
      pageType,
      pathname,
      previousPath,
      dials,
    } = props;

    return (
      <ToggleContextProvider>
        <DialContextProvider dials={dials}>
          <ServiceContextProvider service={service} variant={variant}>
            <RequestContextProvider
              bbcOrigin={bbcOrigin}
              id={id}
              isAmp={isAmp}
              pageType={pageType}
              service={service}
              pathname={pathname}
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
    pathname: string.isRequired,
    previousPath: string,
    service: string.isRequired,
    dials: objectOf(bool).isRequired,
    variant: oneOf(['simp', 'trad', 'lat', 'cyr']),
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    id: null,
    previousPath: null,
    variant: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
