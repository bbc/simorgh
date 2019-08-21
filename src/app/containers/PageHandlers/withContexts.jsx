import React from 'react';
import { bool, element, string } from 'prop-types';

// context providers
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { UserContextProvider } from '../../contexts/UserContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const { bbcOrigin, id, service, isAmp, pageType, previousPath } = props;
    return (
      <ToggleContextProvider>
        <ServiceContextProvider service={service}>
          <RequestContextProvider
            bbcOrigin={bbcOrigin}
            id={id}
            isAmp={isAmp}
            pageType={pageType}
            service={service}
            previousPath={previousPath}
          >
            <UserContextProvider>
              <Component {...props} />
            </UserContextProvider>
          </RequestContextProvider>
        </ServiceContextProvider>
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
  };

  WithContextsContainer.defaultProps = {
    bbcOrigin: null,
    id: null,
    previousPath: null,
  };

  return WithContextsContainer;
};

WithContexts.propTypes = {
  Component: element,
};

export default WithContexts;
