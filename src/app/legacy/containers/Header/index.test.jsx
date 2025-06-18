import React from 'react';
import * as PAGE_TYPES from '#app/routes/utils/pageTypes';
import userEvent from '@testing-library/user-event';
import Cookies from 'js-cookie';
import {
  render,
  screen,
} from '../../../components/react-testing-library-with-providers';
import { service as pidginServiceConfig } from '../../../lib/config/services/pidgin';
import HeaderContainer from './index';

const {
  AUDIO_PAGE,
  INDEX_PAGE,
  ARTICLE_PAGE,
  LIVE_RADIO_PAGE,
  MEDIA_ASSET_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
  ERROR_PAGE,
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

const HeaderContainerWithContext = ({ renderOptions }) =>
  render(<HeaderContainer />, {
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

    it('should render correctly for WS radio page', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: LIVE_RADIO_PAGE,
        },
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render correctly for WS TV page', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: TV_PAGE,
        },
      });

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should render correctly for WS on demand audio page', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: AUDIO_PAGE,
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
          pageType: HOME_PAGE,
        },
      });

      const skipLink = document.querySelector("a[href$='#content']");
      expect(skipLink).toBeVisible();
    });

    const scriptLinkSelector = 'a[data-variant]';

    it('should not render script link for a service without variants', () => {
      HeaderContainerWithContext({
        renderOptions: {
          pageType: HOME_PAGE,
          service: 'pidgin',
        },
      });
      expect(document.querySelectorAll(scriptLinkSelector).length).toBe(0);
    });

    it('should render script link for a service with variants', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: {
          pageType: HOME_PAGE,
          service: 'serbian',
          variant: 'cyr',
        },
      });

      expect(container.querySelectorAll(scriptLinkSelector).length).toBe(1);
    });

    describe('when service is uzbek', () => {
      describe.each(['cyr', 'lat'])('and variant is %s', variant => {
        const supportedUzbekPageTypes = [
          ARTICLE_PAGE,
          HOME_PAGE,
          TOPIC_PAGE,
          ERROR_PAGE,
        ];
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

    it('should focus on consent banner heading on mount', () => {
      const initialFocusElement = document.activeElement;
      HeaderContainerWithContext({
        renderOptions: {
          pageType: INDEX_PAGE,
          service: 'pidgin',
        },
      });
      const pidginCookieHeading =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .title;
      expect(document.activeElement).not.toBe(initialFocusElement);
      expect(document.activeElement).toBe(
        screen.getByText(pidginCookieHeading),
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

    it('should remove the cookie banner when navigating from the reject button to content with tab', () => {
      const { container } = HeaderContainerWithContext({
        renderOptions: { pageType: INDEX_PAGE, service: 'pidgin' },
      });

      const pidginCookieReject =
        pidginServiceConfig.default.translations.consentBanner.cookie.canonical
          .reject;

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
