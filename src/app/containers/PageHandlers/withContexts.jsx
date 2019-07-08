import React from 'react';
import { bool, element, objectOf, string } from 'prop-types';

// context providers
import { DialContextProvider } from '../../contexts/DialContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const { bbcOrigin, id, service, isAmp, pageType, dials } = props;
    return (
      <DialContextProvider dials={dials}>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            bbcOrigin={bbcOrigin}
            id={id}
            isAmp={isAmp}
            pageType={pageType}
            service={service}
          >
            <Component {...props} />
          </RequestContextProvider>
        </ServiceContextProvider>
      </DialContextProvider>
    );
  };

  WithContextsContainer.propTypes = {
    bbcOrigin: string,
    id: string,
    isAmp: bool.isRequired,
    pageType: string.isRequired,
    service: string.isRequired,
    dials: objectOf(bool).isRequired,
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    id: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
