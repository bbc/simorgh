import React from 'react';
import { node, string, shape, bool } from 'prop-types';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ComscoreAnalytics from '.';

const mockToggleDispatch = jest.fn();

const defaultPersonalisation = { personalisationEnabled: false };

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  comscoreAnalyticsToggle,
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
            comscoreAnalytics: {
              enabled: comscoreAnalyticsToggle,
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
  comscoreAnalyticsToggle: bool.isRequired,
  personalisation: shape({}),
};

ContextWrap.defaultProps = {
  personalisation: defaultPersonalisation,
};

describe('Comscore Analytics Container', () => {
  describe('AMP', () => {
    it('should return null when toggle is disabled', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle={false}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render comscore amp-analytics component', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Canonical', () => {
    shouldMatchSnapshot(
      'should render comscore script when on canonical',
      <ContextWrap
        platform="amp"
        pageType={ARTICLE_PAGE}
        origin="bbc.com"
        comscoreAnalyticsToggle
      >
        <ComscoreAnalytics />
      </ContextWrap>,
    );

    it('should return null when toggle is disabled', async () => {
      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          comscoreAnalyticsToggle={false}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
