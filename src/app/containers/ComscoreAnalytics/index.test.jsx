import React from 'react';
import { node, string, shape } from 'prop-types';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import ComscoreAnalytics from '.';

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

describe('Comscore Analytics Container', () => {
  describe('Assertions - AMP', () => {
    it('should return null when toggle is disabled', () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: false,
        },
      };
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Assertions - Canonical', () => {
    it('should return null when toggle is disabled', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: false,
        },
      };
      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
