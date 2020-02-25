import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import HeaderContainer from './index';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { UserContext } from '#contexts/UserContext';
import { service as pidginServiceConfig } from '#lib/config/services/pidgin';
import * as cookies from '#contexts/UserContext/cookies';

const defaultToggleState = {
  test: {
    navOnArticles: {
      enabled: true,
    },
  },
  live: {
    navOnArticles: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();

const variantServiceConfig = {
  ...pidginServiceConfig.default,
  scriptLink: {
    text: 'Test',
    offscreenText: 'Test-variant',
  },
};

jest.mock('#lib/utilities/variantHandler');
const variantHandlers = require('#lib/utilities/variantHandler');

variantHandlers.getOtherVariant.mockImplementation(() => 'test');

const setPreferredVariantCookieSpy = jest.spyOn(
  cookies,
  'setPreferredVariantCookie',
);
const userContextMock = {
  setPreferredVariantCookie: cookies.setPreferredVariantCookie,
};

/* eslint-disable react/prop-types */
const HeaderContainerWithContext = ({
  pageType,
  service = 'pidgin',
  serviceContext = pidginServiceConfig.default,
  bbcOrigin = 'https://www.test.bbc.com',
}) => (
  <ToggleContext.Provider
    value={{
      toggleState: defaultToggleState,
      toggleDispatch: mockToggleDispatch,
    }}
  >
    <ServiceContext.Provider value={serviceContext}>
      <UserContext.Provider value={userContextMock}>
        <RequestContextProvider
          isAmp={false}
          pageType={pageType}
          service={service}
          statusCode={200}
          bbcOrigin={bbcOrigin}
          pathname="/pathname"
        >
          <HeaderContainer />
        </RequestContextProvider>
      </UserContext.Provider>
    </ServiceContext.Provider>
  </ToggleContext.Provider>
);

describe(`Header`, () => {
  shouldMatchSnapshot(
    'should render correctly for news article',
    HeaderContainerWithContext({
      pageType: 'article',
      service: 'news',
    }),
  );

  shouldMatchSnapshot(
    'should render correctly for WS frontPage',
    HeaderContainerWithContext({
      pageType: 'frontPage',
    }),
  );

  shouldMatchSnapshot(
    'should render correctly for WS radio page',
    HeaderContainerWithContext({
      pageType: 'media',
    }),
  );

  it('should output a nav bar for media asset pages', () => {
    render(HeaderContainerWithContext({ pageType: 'MAP' }));
    expect(document.querySelector(`header nav`)).not.toBeNull();
  });

  it('should output a nav bar for articles', () => {
    render(HeaderContainerWithContext({ pageType: 'article' }));
    expect(document.querySelector(`header nav`)).not.toBeNull();
  });

  it('should NOT output a nav bar for articles on live', () => {
    render(
      HeaderContainerWithContext({
        pageType: 'article',
        bbcOrigin: 'https://www.bbc.com',
      }),
    );
    expect(document.querySelector(`header nav`)).toBeNull();
  });

  it('should render a Brand with a Skip to content link, linking to #content', () => {
    render(
      HeaderContainerWithContext({
        pageType: 'frontPage',
      }),
    );

    const skipLink = document.querySelector("a[href$='#content']");
    expect(skipLink).toBeVisible();
  });

  describe('Script Link and Preferred Variant Cookie', () => {
    let scriptLink;

    beforeEach(() => {
      const { container } = render(
        HeaderContainerWithContext({
          pageType: 'frontPage',
          serviceContext: variantServiceConfig,
        }),
      );
      scriptLink = container.querySelector('a[data-variant="test"]');
    });

    afterEach(() => {
      document.cookie = '';
      jest.clearAllMocks();
    });

    it('Script Link should contain link to other variant', () => {
      expect(scriptLink.getAttribute('href')).toBe('/pidgin/test');
    });

    it('should set preferred variant cookie when ScriptLink is clicked and cookie is not defined', () => {
      document.cookie = '';

      fireEvent.click(scriptLink);

      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(1);
      expect(document.cookie).toEqual('; ckps_pidgin=test');
    });

    it('should update preferred variant cookie when ScriptLink is clicked and cookie exists', () => {
      document.cookie = 'ckps_pidgin=lat';

      fireEvent.click(scriptLink);

      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(1);
      expect(document.cookie).toEqual('; ckps_pidgin=test');
    });
  });
});
