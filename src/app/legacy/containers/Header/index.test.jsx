import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContextProvider } from '#contexts/UserContext';
import {
  INDEX_PAGE,
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MEDIA_ASSET_PAGE,
  TOPIC_PAGE,
} from '#app/routes/utils/pageTypes';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import { ServiceContext } from '../../../contexts/ServiceContext';
import { service as pidginServiceConfig } from '../../../lib/config/services/pidgin';
import { service as serbianServiceConfig } from '../../../lib/config/services/serbian';
import { service as ukrainianServiceConfig } from '../../../lib/config/services/ukrainian';
import HeaderContainer from './index';

const defaultToggleState = {
  navOnArticles: {
    enabled: true,
  },
  scriptLink: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
};

const mockToggleDispatch = jest.fn();

/* eslint-disable react/prop-types */
const HeaderContainerWithContext = ({
  pageType,
  service = 'pidgin',
  serviceContext = pidginServiceConfig,
  bbcOrigin = 'https://www.test.bbc.com',
  variant = 'default',
  isAmp = false,
  renderScriptSwitch = true,
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    }}
  >
    <ServiceContext.Provider value={serviceContext[variant]}>
      <RequestContextProvider
        isAmp={isAmp}
        pageType={pageType}
        service={service}
        statusCode={200}
        bbcOrigin={bbcOrigin}
        pathname="/pathname"
        variant={variant}
      >
        <UserContextProvider>
          <HeaderContainer renderScriptSwitch={renderScriptSwitch} />
        </UserContextProvider>
      </RequestContextProvider>
    </ServiceContext.Provider>
  </ToggleContext.Provider>
);

describe(`Header`, () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should render correctly for news article',
      HeaderContainerWithContext({
        pageType: ARTICLE_PAGE,
        service: 'news',
      }),
    );

    shouldMatchSnapshot(
      'should render correctly for WS frontPage',
      HeaderContainerWithContext({
        pageType: FRONT_PAGE,
      }),
    );

    shouldMatchSnapshot(
      'should render correctly for WS radio page',
      HeaderContainerWithContext({
        pageType: MEDIA_PAGE,
      }),
    );
  });

  describe('Assertions', () => {
    it('should output a nav bar for media asset pages', () => {
      render(HeaderContainerWithContext({ pageType: MEDIA_ASSET_PAGE }));
      expect(document.querySelector(`header nav`)).not.toBeNull();
    });

    it('should output a nav bar for articles', () => {
      render(HeaderContainerWithContext({ pageType: ARTICLE_PAGE }));
      expect(document.querySelector(`header nav`)).not.toBeNull();
    });

    it('should render a Brand with a Skip to content link, linking to #content', () => {
      render(
        HeaderContainerWithContext({
          pageType: FRONT_PAGE,
        }),
      );

      const skipLink = document.querySelector("a[href$='#content']");
      expect(skipLink).toBeVisible();
    });

    const scriptLinkSelector = 'a[data-variant]';

    it('should not render script link for a service without variants', () => {
      render(
        HeaderContainerWithContext({
          pageType: FRONT_PAGE,
          service: 'pidgin',
          serviceContext: pidginServiceConfig,
        }),
      );
      expect(document.querySelectorAll(scriptLinkSelector).length).toBe(0);
    });

    it('should render script link for a service with variants', () => {
      const { container } = render(
        HeaderContainerWithContext({
          pageType: FRONT_PAGE,
          service: 'serbian',
          serviceContext: serbianServiceConfig,
          variant: 'cyr',
        }),
        {
          wrapper: MemoryRouter,
        },
      );

      expect(container.querySelectorAll(scriptLinkSelector).length).toBe(1);
    });

    it('should not render script link on Topic page when missing variant topic ID', () => {
      const { container } = render(
        HeaderContainerWithContext({
          pageType: TOPIC_PAGE,
          service: 'serbian',
          serviceContext: serbianServiceConfig,
          variant: 'cyr',
          renderScriptSwitch: false,
        }),
        {
          wrapper: MemoryRouter,
        },
      );

      expect(container.querySelectorAll(scriptLinkSelector).length).toBe(0);
    });

    it('should render header with lang when serviceLang is defined', () => {
      const { container } = render(
        HeaderContainerWithContext({
          pageType: INDEX_PAGE,
          service: 'ukrainian',
          serviceContext: ukrainianServiceConfig,
          variant: 'ru-UA',
        }),
        {
          wrapper: MemoryRouter,
        },
      );

      expect(container.querySelector('header')).toHaveAttribute('lang', 'uk');
    });

    it('should render a skip to content link with lang', async () => {
      render(
        HeaderContainerWithContext({
          pageType: INDEX_PAGE,
          service: 'ukrainian',
          serviceContext: ukrainianServiceConfig,
          variant: 'ru-UA',
        }),
      );

      const skipLink = document.querySelector("a[href$='#content']");
      expect(skipLink).toHaveAttribute('lang', 'ru-UA');
    });

    it('should focus on consent banner heading on mount', () => {
      const initialFocusElement = document.activeElement;
      const { getByText } = render(
        HeaderContainerWithContext({
          pageType: INDEX_PAGE,
          service: 'pidgin',
          serviceContext: pidginServiceConfig,
        }),
      );
      const pidginPrivacyHeading =
        pidginServiceConfig.default.translations.consentBanner.privacy.title;
      expect(document.activeElement).not.toBe(initialFocusElement);
      expect(document.activeElement).toBe(getByText(pidginPrivacyHeading));
    });

    it('should focus on the brand link on cookie banner accept', () => {
      const { getByText } = render(
        HeaderContainerWithContext({
          pageType: INDEX_PAGE,
          service: 'pidgin',
          serviceContext: pidginServiceConfig,
        }),
      );

      const pidginPrivacyAccept =
        pidginServiceConfig.default.translations.consentBanner.privacy.accept;
      const pidginCookieAccept =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .accept;
      const logoHref = pidginServiceConfig.default.navigation[0].url;

      getByText(pidginPrivacyAccept).click();
      getByText(pidginCookieAccept).click();

      expect(document.activeElement).toBe(
        document.querySelector(`a[href="${logoHref}"]`),
      );
    });

    it("should render the brand link with an id of 'brandLink' on AMP", () => {
      const { container } = render(
        HeaderContainerWithContext({
          isAmp: true,
          pageType: INDEX_PAGE,
          service: 'pidgin',
          serviceContext: pidginServiceConfig,
        }),
      );

      expect(container.querySelector('#brandLink')).toBe(
        container.querySelector('a[href="/pidgin"]'),
      );
    });
  });
});
