import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { node, string, shape } from 'prop-types';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import ComscoreAnalytics from '.';

const defaultToggleState = {
  comscoreAnalytics: {
    enabled: false,
  },
};

const defaultCookiePolicy = { cookiePolicy: '111' };

const mockToggleDispatch = jest.fn();

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  toggleState,
  cookiePolicy,
}) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    pageType={pageType}
    service="news"
    statusCode={200}
    bbcOrigin={origin}
    pathname="/pathname"
  >
    <ServiceContextProvider service="news">
      <ToggleContext.Provider
        value={{
          toggleState,
          toggleDispatch: mockToggleDispatch,
        }}
      >
        <UserContext.Provider value={cookiePolicy}>
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
  cookiePolicy: shape({}),
};

ContextWrap.defaultProps = {
  toggleState: defaultToggleState,
  cookiePolicy: defaultCookiePolicy,
};

describe('Comscore Analytics Container', () => {
  describe('Assertions', () => {
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

      expect(container.firstChild).toBeNull();
    });

    it('should return null when user cookie policy value is 000 for canonical', () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: true,
        },
      };
      const mockCookiePolicy = { cookiePolicy: '000' };

      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
          cookiePolicy={mockCookiePolicy}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Snapshots', () => {
    it('should render comscore script when on amp and toggle is enabled', () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: true,
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

      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });

    const toggleState = {
      comscoreAnalytics: {
        enabled: true,
      },
    };

    shouldMatchSnapshot(
      'should render comscore script when on canonical and toggle is enabled',
      <ContextWrap
        platform="canonical"
        pageType="article"
        origin="bbc.com"
        toggleState={toggleState}
      >
        <ComscoreAnalytics />
      </ContextWrap>,
    );
  });
});
