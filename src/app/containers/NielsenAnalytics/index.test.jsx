import React from 'react';
import { node, string, shape, bool } from 'prop-types';
import { render } from '@testing-library/react';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import NielsenAnalytics from '.';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

const mockToggleDispatch = jest.fn();

const defaultPersonalisation = { personalisationEnabled: false };

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  nielsenAnalyticsToggle,
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
          toggleState: {
            nielsenAnalytics: {
              enabled: nielsenAnalyticsToggle,
            },
          },
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
  nielsenAnalyticsToggle: bool.isRequired,
  personalisation: shape({}),
};

ContextWrap.defaultProps = {
  personalisation: defaultPersonalisation,
};

describe('Nielsen Analytics Container', () => {
  describe('AMP', () => {
    it('should return null when toggle is disabled', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle={false}
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should return null not an AMP page', () => {
      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render Nielsen amp-analytics component', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
