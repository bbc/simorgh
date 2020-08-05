import React from 'react';
import { node, string, shape } from 'prop-types';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';

const defaultToggleState = {
  comscoreAnalytics: {
    enabled: false,
  },
};

const mockToggleDispatch = jest.fn();

const defaultPersonalisation = { personalisationEnabled: false };

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  toggleState,
  personalisation,
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    statusCode={200}
    bbcOrigin={origin}
    pathname="/pathname"
  >
    <ServiceContextProvider service="pidgin">
      <ToggleContext.Provider
        value={{
          toggleState,
          toggleDispatch: mockToggleDispatch,
        }}
      >
        <UserContext.Provider value={personalisation}>
          {children}
        </UserContext.Provider>
      </ToggleContext.Provider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

ContextWrap.propTypes = {
  children: node.isRequired,
  pageType: string.isRequired,
  origin: string.isRequired,
  platform: string.isRequired,
  toggleState: shape({}),
  personalisation: shape({}),
};

ContextWrap.defaultProps = {
  toggleState: defaultToggleState,
  personalisation: defaultPersonalisation,
};

export default ContextWrap;
