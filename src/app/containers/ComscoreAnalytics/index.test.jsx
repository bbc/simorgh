import React from 'react';
import { render, waitFor } from '@testing-library/react';
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

const defaultPersonalisation = { personalisationEnabled: false };

const mockToggleDispatch = jest.fn();

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
    <ServiceContextProvider service="news">
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

    it('should render the canonical noscript with cs_ucfr=0', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: true,
        },
      };
      render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      await waitFor(() => {
        const noScriptContent = document.querySelector('noscript').textContent;
        expect(noScriptContent.includes('cs_ucfr=0')).toBeTruthy();
      });
    });

    it('should render the canonical noscript with cs_ucfr=1', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: true,
        },
      };
      const personalisation = { personalisationEnabled: true };

      render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
          personalisation={personalisation}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      await waitFor(() => {
        const noScriptContent = document.querySelector('noscript').textContent;
        expect(noScriptContent.includes('cs_ucfr=1')).toBeTruthy();
      });
    });

    it('should render the canonical comscore script from self-hosted src', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: true,
        },
      };

      render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      await waitFor(() => {
        const scriptSrc = document.querySelector('script').src;
        expect(scriptSrc.includes('static/js/comscore.js')).toBeTruthy();
      });
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
