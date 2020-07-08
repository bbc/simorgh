import React from 'react';
import { render } from '@testing-library/react';
import { node, string, shape } from 'prop-types';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import ComscoreAnalytics from '.';

const defaultToggleState = {
  comscoreAnalytics: {
    enabled: false,
  },
};

const mockToggleDispatch = jest.fn();

const ContextWrap = ({ pageType, platform, origin, children, toggleState }) => (
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
        {children}
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
};

ContextWrap.defaultProps = {
  toggleState: defaultToggleState,
};

describe('Comscore Analytics Container', () => {
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

  it('should return null when toggle is enabled but on canonical', () => {
    const toggleState = {
      comscoreAnalytics: {
        enabled: true,
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

    expect(container.firstChild).toBeNull();
  });

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
});
