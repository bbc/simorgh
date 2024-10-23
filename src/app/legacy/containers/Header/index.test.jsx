import React from 'react';
import * as PAGE_TYPES from '#app/routes/utils/pageTypes';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import {
  render,
  screen,
  fireEvent,
} from '../../../components/react-testing-library-with-providers';
import { service as pidginServiceConfig } from '../../../lib/config/services/pidgin';
import HeaderContainer from './index';

const {
  INDEX_PAGE,
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MEDIA_ASSET_PAGE,
  TOPIC_PAGE,
  HOME_PAGE,
} = PAGE_TYPES;

const defaultToggleState = {
  scriptLink: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ path: '/news', params: {} }),
}));

const HeaderContainerWithContext = ({
  renderScriptSwitch = true,
  renderOptions,
}) =>
  render(<HeaderContainer renderScriptSwitch={renderScriptSwitch} />, {
    toggles: defaultToggleState,
    ...renderOptions,
  });

describe(`Header`, () => {
  beforeEach(() => {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  });

  describe('Snapshots', () => {
    it('should render correctly for news article', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: ARTICLE_PAGE,
          service: 'news',
        },
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render correctly for WS frontpage', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: FRONT_PAGE,
        },
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render correctly for WS radio page', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: MEDIA_PAGE,
        },
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('Assertions', () => {
    it('should output a nav bar for media asset pages', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: MEDIA_ASSET_PAGE,
        },
      });
      expect(document.querySelector(`header nav`)).not.toBeNull();
    });

    it('should output a nav bar for articles', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: ARTICLE_PAGE,
        },
      });
      expect(document.querySelector(`header nav`)).not.toBeNull();
    });

    it('should render a Brand with a Skip to content link, linking to #content', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: FRONT_PAGE,
        },
      });

      const skipLink = document.querySelector("a[href$='#content']");
      expect(skipLink).toBeVisible();
    });

    const scriptLinkSelector = 'a[data-variant]';

    it('should not render script link for a service without variants', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: FRONT_PAGE,
          service: 'pidgin',
        },
      });
      expect(document.querySelectorAll(scriptLinkSelector).length).toBe(0);
    });

    it('should render script link for a service with variants', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: FRONT_PAGE,
          service: 'serbian',
          variant: 'cyr',
        },
      });

      expect(container.querySelectorAll(scriptLinkSelector).length).toBe(1);
    });

    describe('when service is uzbek', () => {
      describe.each(['cyr', 'lat'])('and variant is %s', variant => {
        const supportedUzbekPageTypes = [ARTICLE_PAGE, HOME_PAGE];
        const unsupportedUzbekPageTypes = Object.values(PAGE_TYPES).filter(
          pageType => !supportedUzbekPageTypes.includes(pageType),
        );

        it.each(supportedUzbekPageTypes)(
          'should render script link when page type is %s',
          pageType => {
            const { container } = HeaderContainerWithContext({
              renderOptions: {
                pageType,
                service: 'uzbek',
                variant,
              },
            });

            expect(container.querySelectorAll(scriptLinkSelector).length).toBe(
              1,
            );
          },
        );

        it.each(unsupportedUzbekPageTypes)(
          'should not render script link when page type is %s',
          pageType => {
            const { container } = HeaderContainerWithContext({
              renderOptions: {
                pageType,
                service: 'uzbek',
                variant,
              },
            });

            expect(container.querySelectorAll(scriptLinkSelector).length).toBe(
              0,
            );
          },
        );
      });
    });

    it('should not render script link on Topic page when missing variant topic ID', () => {
      const { container } = HeaderContainerWithContext({
        renderScriptSwitch: false,
        renderOptions: {
          pageType: TOPIC_PAGE,
          service: 'serbian',
          variant: 'cyr',
        },
      });

      expect(container.querySelectorAll(scriptLinkSelector).length).toBe(0);
    });

    it('should focus on consent banner heading on mount', () => {
      const initialFocusElement = document.activeElement;
      HeaderContainerWithContext({
        renderOptions: {
          pageType: INDEX_PAGE,
          service: 'pidgin',
        },
      });
      const pidginPrivacyHeading =
        pidginServiceConfig.default.translations.consentBanner.privacy.title;
      expect(document.activeElement).not.toBe(initialFocusElement);
      expect(document.activeElement).toBe(
        screen.getByText(pidginPrivacyHeading),
      );
    });

    it('should focus on the brand link on cookie banner accept', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: INDEX_PAGE,
          service: 'pidgin',
        },
      });

      const pidginPrivacyAccept =
        pidginServiceConfig.default.translations.consentBanner.privacy.accept;
      const pidginCookieAccept =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .accept;
      const logoHref = pidginServiceConfig.default.navigation[0].url;

      fireEvent.click(screen.getByText(pidginPrivacyAccept));
      fireEvent.click(screen.getByText(pidginCookieAccept));

      expect(document.activeElement).toBe(
        document.querySelector(`a[href="${logoHref}"]`),
      );
    });

    it("should render the brand link with an id of 'brandLink' on AMP", () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: INDEX_PAGE,
          service: 'pidgin',
          isAmp: true,
        },
      });

      expect(container.querySelector('#brandLink')).toBe(
        container.querySelector('a[href="/pidgin"]'),
      );
    });

    it('should remove the privacy banner when navigating from the reject button to content with tab', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: { pageType: INDEX_PAGE, service: 'pidgin' },
      });

      const pidginPrivacyReject =
        pidginServiceConfig.default.translations.consentBanner.privacy.reject;

      const reject = screen.getByText(pidginPrivacyReject);
      fireEvent.focus(reject);

      expect(container).toContainElement(reject);

      userEvent.tab().then(() => {
        expect(container).not.toContainElement(reject);
      });
    });

    it('should remove the cookie banner when navigating from the reject button to content with tab', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: { pageType: INDEX_PAGE, service: 'pidgin' },
      });

      const pidginPrivacyAccept =
        pidginServiceConfig.default.translations.consentBanner.privacy.accept;
      const pidginCookieReject =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .reject;

      const acceptPrivacy = screen.getByText(pidginPrivacyAccept);
      fireEvent.click(acceptPrivacy);

      const reject = screen.getByText(pidginCookieReject);

      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      userEvent.tab();
      expect(container).toContainElement(reject);
      userEvent.tab().then(() => {
        expect(container).not.toContainElement(reject);
      });
    });

    it('should remove the site branding when isApp is set to true', () => {
      HeaderContainerWithContext({
        renderOptions: {
          isApp: true,
        },
      });

      expect(
        document.querySelector(`header[role='banner'] div div:nth-of-type(2)`),
      ).toBeNull();
    });

    it('should remove the nav when isApp is set to true', () => {
      HeaderContainerWithContext({
        renderOptions: {
          isApp: true,
        },
      });

      expect(document.querySelector(`header[role='banner'] nav`)).toBeNull();
    });

    it('should remove the privacy/cookie banner when isApp is set to true', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          isApp: true,
          service: 'pidgin',
          pageType: ARTICLE_PAGE,
        },
      });

      const pidginPrivacyAcceptText =
        pidginServiceConfig.default.translations.consentBanner.privacy.accept;
      const pidginCookieAcceptText =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .accept;

      const privacyBanner = screen.queryByText(pidginPrivacyAcceptText);
      const cookieBanner = screen.queryByText(pidginCookieAcceptText);

      expect(container).not.toContainElement(privacyBanner);
      expect(container).not.toContainElement(cookieBanner);
    });
  });
});
