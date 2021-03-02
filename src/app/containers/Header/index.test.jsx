import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import HeaderContainer from './index';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';
import { service as serbianServiceConfig } from '#lib/config/services/serbian';
import { service as ukrainianServiceConfig } from '#lib/config/services/ukrainian';
import {
  INDEX_PAGE,
  ARTICLE_PAGE,
  FRONT_PAGE,
  MEDIA_PAGE,
  MEDIA_ASSET_PAGE,
} from '#app/routes/utils/pageTypes';

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
  service = 'news',
  serviceContext = pidginServiceConfig,
  bbcOrigin = 'https://www.test.bbc.com',
  variant = 'default',
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    }}
  >
    <ServiceContext.Provider value={serviceContext[variant]}>
      <RequestContextProvider
        isAmp={false}
        pageType={pageType}
        service={service}
        statusCode={200}
        bbcOrigin={bbcOrigin}
        pathname="/pathname"
        variant={variant}
      >
        <HeaderContainer />
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
  });
});
