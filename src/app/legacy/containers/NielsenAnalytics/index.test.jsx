import React, { useMemo } from 'react';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import NielsenAnalytics from '.';

const mockToggleDispatch = jest.fn();

const defaultPersonalisation = { personalisationEnabled: false };

const ContextWrap = ({
  pageType,
  platform,
  origin,
  children,
  nielsenAnalyticsToggle,
  personalisation = defaultPersonalisation,
  service,
  pathname,
}) => {
  const memoizedRequestContextValue = useMemo(
    () => ({
      toggleState: {
        nielsenAnalytics: {
          enabled: nielsenAnalyticsToggle,
        },
      },
      toggleDispatch: mockToggleDispatch,
    }),
    [nielsenAnalyticsToggle],
  );
  return (
    <RequestContextProvider
      isAmp={platform === 'amp'}
      pageType={pageType}
      service={service}
      statusCode={200}
      bbcOrigin={origin}
      pathname={pathname}
    >
      <ServiceContextProvider service="pidgin">
        <ToggleContext.Provider value={memoizedRequestContextValue}>
          <UserContext.Provider value={personalisation}>
            {children}
          </UserContext.Provider>
        </ToggleContext.Provider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
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
          service="news"
          pathname="somepath"
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
          service="news"
          pathname="somepath"
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
          service="news"
          pathname="somepath"
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should set correct apid for news pages', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
          service="news"
          pathname="somepath"
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      const data = JSON.parse(container.querySelector('script').textContent);
      expect(data.vars.apid).toBe('474C2B0B-0C04-4182-BCFB-FC9469A48C9B');
    });

    it('should set correct apid for sports pages', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
          service="sport"
          pathname="somepath"
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      const data = JSON.parse(container.querySelector('script').textContent);
      expect(data.vars.apid).toBe('DC4AFDB2-B352-4D51-81EF-38BE41114F22');
    });

    it('should set correct section for CPS articles', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
          service="sport"
          pathname="/news/business-58007120.amp"
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      const data = JSON.parse(container.querySelector('script').textContent);
      expect(data.vars.section).toBe('BBC Sport Business');
    });

    it('should set correct section for Optimo articles', () => {
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType={ARTICLE_PAGE}
          origin="bbc.com"
          nielsenAnalyticsToggle
          service="news"
          pathname="/sport/articles/c6v11qzyv8po.amp"
        >
          <NielsenAnalytics />
        </ContextWrap>,
      );

      const data = JSON.parse(container.querySelector('script').textContent);
      expect(data.vars.section).toBe('BBC News');
    });
  });
});
