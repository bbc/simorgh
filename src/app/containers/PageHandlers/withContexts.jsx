import React from 'react';
import { bool, element, string, shape, number } from 'prop-types';
import variantPropType from '../../models/propTypes/variants';

// context providers
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { UserContextProvider } from '../../contexts/UserContext';
import { EventContextProvider } from '../../contexts/EventContext';

const WithContexts = Component => {
  const WithContextsContainer = props => {
    const {
      bbcOrigin,
      data,
      id,
      service,
      isAmp,
      pageType,
      pathname,
      previousPath,
      variant,
    } = props;

    // Temp fix. This destructuring will become redundant
    // following https://github.com/bbc/simorgh/issues/3839
    const { status } = data;

    return (
      <ToggleContextProvider>
        <ServiceContextProvider service={service} variant={variant}>
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
    data: shape({
      status: number.isRequired,
    }).isRequired,
    id: string,
    isAmp: bool.isRequired,
    pageType: string.isRequired,
    pathname: string.isRequired,
    previousPath: string,
    service: string.isRequired,
    variant: variantPropType,
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
