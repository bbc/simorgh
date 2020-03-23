import React from 'react';
import { node } from 'prop-types';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { service as serbianServiceConfig } from '#lib/config/services/serbian';
import { service as ukChinaServiceConfig } from '#lib/config/services/ukchina';
import * as cookies from '#contexts/UserContext/cookies';
import ScriptLinkContainer, { getVariantHref } from '.';
import {
  articlePath,
  cpsAssetPagePath,
  errorPagePath,
  frontPagePath,
  legacyAssetPagePath,
} from '#app/routes/utils/regex';

const setPreferredVariantCookieSpy = jest.spyOn(
  cookies,
  'setPreferredVariantCookie',
);

const userContextMock = {
  setPreferredVariantCookie: cookies.setPreferredVariantCookie,
};

const requestContextMock = {
  variant: 'lat',
  env: 'test',
};

const withRouter = (component, matchPath, path) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[path]}>
      <Route path={matchPath}>{children}</Route>
    </MemoryRouter>
  );

  Wrapper.propTypes = {
    children: node.isRequired,
  };

  return {
    ...render(component, { wrapper: Wrapper }),
  };
};

const defaultToggleState = {
  local: {
    scriptLink: {
      enabled: true,
    },
    variantCookie: {
      enabled: true,
    },
  },
  test: {
    scriptLink: {
      enabled: true,
    },
    variantCookie: {
      enabled: true,
    },
  },
  live: {
    scriptLink: {
      enabled: true,
    },
    variantCookie: {
      enabled: true,
    },
  },
};

const mockToggleDispatch = jest.fn();

const toggleContextMock = {
  toggleState: defaultToggleState,
  toggleDispatch: mockToggleDispatch,
};

/* eslint-disable react/prop-types */
const ScriptLinkContainerWithContext = ({
  serviceContext = serbianServiceConfig.lat,
  requestContext = requestContextMock,
  toggleContext = toggleContextMock,
}) => (
  <ToggleContext.Provider value={toggleContext}>
    <ServiceContext.Provider value={serviceContext}>
      <UserContext.Provider value={userContextMock}>
        <RequestContext.Provider value={requestContext}>
          <ScriptLinkContainer />
        </RequestContext.Provider>
      </UserContext.Provider>
    </ServiceContext.Provider>
  </ToggleContext.Provider>
);

describe(`Script Link`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot(
    'should render correctly',
    <MemoryRouter initialEntries={['/serbian/lat']}>
      <Route path={frontPagePath}>
        <ScriptLinkContainerWithContext />
      </Route>
    </MemoryRouter>,
  );

  describe('assertions', () => {
    const testCases = {
      article: {
        matchPath: articlePath,
        path: '/serbian/articles/c805k05kr73o/lat',
        variantPath: '/serbian/articles/c805k05kr73o/cyr',
      },
      cpsAssetPage: {
        matchPath: cpsAssetPagePath,
        path: '/serbian/lat/srbija-46748932',
        variantPath: '/serbian/cyr/srbija-46748932',
      },
      errorPage: {
        matchPath: errorPagePath,
        path: '/serbian/404/lat',
        variantPath: '/serbian/404/cyr',
      },
      frontPage: {
        matchPath: frontPagePath,
        path: '/serbian/lat',
        variantPath: '/serbian/cyr',
      },
      legacyAssetPage: {
        matchPath: legacyAssetPagePath,
        path:
          '/ukchina/trad/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs',
        variantPath:
          '/ukchina/simp/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs',
        serviceContext: ukChinaServiceConfig.trad,
        requestContext: { variant: 'trad', env: 'test' },
        otherVariant: 'simp',
      },
    };

    describe('canonical', () => {
      Object.keys(testCases).forEach(testCase => {
        it(`Script Link should contain link to other variant when on ${testCase}`, () => {
          const {
            matchPath,
            path,
            variantPath,
            serviceContext = serbianServiceConfig.lat,
            requestContext = requestContextMock,
            toggleContext = toggleContextMock,
            otherVariant = 'cyr',
          } = testCases[testCase];

          const { container } = withRouter(
            <ScriptLinkContainerWithContext
              serviceContext={serviceContext}
              requestContext={requestContext}
              toggleContext={toggleContext}
            />,
            matchPath,
            path,
          );

          const scriptLink = container.querySelector(
            `a[data-variant="${otherVariant}"]`,
          );

          expect(scriptLink.getAttribute('href')).toBe(variantPath);
        });
      });
    });

    describe('amp', () => {
      const { errorPage, ...ampTestCases } = testCases;
      Object.keys(ampTestCases).forEach(testCase => {
        it(`Script Link should contain link to other variant when on ${testCase}`, () => {
          const {
            matchPath,
            path,
            variantPath,
            serviceContext = serbianServiceConfig.lat,
            requestContext = requestContextMock,
            toggleContext = toggleContextMock,
            otherVariant = 'cyr',
          } = testCases[testCase];

          const { container } = withRouter(
            <ScriptLinkContainerWithContext
              serviceContext={serviceContext}
              requestContext={requestContext}
              toggleContext={toggleContext}
            />,
            matchPath,
            `${path}.amp`,
          );

          const scriptLink = container.querySelector(
            `a[data-variant="${otherVariant}"]`,
          );

          expect(scriptLink.getAttribute('href')).toBe(`${variantPath}`);
        });
      });
    });

    it('should set preferred variant cookie when ScriptLink is clicked', () => {
      const { container } = withRouter(
        <ScriptLinkContainerWithContext />,
        frontPagePath,
        '/serbian/lat',
      );
      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      fireEvent.click(scriptLink);
      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(1);
    });

    it('should not set preferred variant cookie when variantCookie toggle is disabled', () => {
      const testToggles = {
        test: {
          scriptLink: {
            enabled: true,
          },
          variantCookie: {
            enabled: false,
          },
        },
      };
      const { container } = withRouter(
        <ScriptLinkContainerWithContext
          toggleContext={{
            toggleState: testToggles,
            toggleDispatch: mockToggleDispatch,
          }}
        />,
        frontPagePath,
        '/serbian/lat',
      );
      const scriptLink = container.querySelector('a[data-variant="cyr"]');
      fireEvent.click(scriptLink);
      expect(setPreferredVariantCookieSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('getVariantHref', () => {
    it('should generate correct variant href on a Canonical page', () => {
      const path = '/:foo(foo)/:bar(bar):variant(/simp|/trad|/cyr|/lat)';

      expect(
        getVariantHref({
          path,
          params: { foo: 'foo', bar: 'bar', variant: '/lat' },
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/foo/bar/cyr');
    });

    it('should generate correct variant href on an AMP page', () => {
      const path =
        '/:foo(foo)/:bar(bar):variant(/simp|/trad|/cyr|/lat):amp(.amp)?';

      expect(
        getVariantHref({
          path,
          params: { foo: 'foo', bar: 'bar', variant: '/lat', amp: '.amp' },
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/foo/bar/cyr');
    });

    it('should generate fallback if no path defined', () => {
      expect(
        getVariantHref({
          params: {},
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/serbian/cyr');
    });

    it('should generate fallback if path does not match defined route from config', () => {
      expect(
        getVariantHref({
          path: '/',
          params: {},
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/serbian/cyr');
    });

    it('should generate fallback if a parameter specified in the path is not provided', () => {
      expect(
        getVariantHref({
          path: '/:foo',
          params: {},
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/serbian/cyr');

      expect(
        getVariantHref({
          path: '/:foo:bar',
          params: { foo: 'foo' },
          service: 'serbian',
          variant: 'cyr',
        }),
      ).toEqual('/serbian/cyr');
    });
  });

  it('should not render when scriptLink toggle is off', () => {
    const testToggles = {
      test: {
        scriptLink: {
          enabled: false,
        },
        variantCookie: {
          enabled: false,
        },
      },
    };
    const { container } = withRouter(
      <ScriptLinkContainerWithContext
        toggleContext={{
          toggleState: testToggles,
          toggleDispatch: mockToggleDispatch,
        }}
      />,
      frontPagePath,
      '/serbian/lat',
    );
    expect(container).toBeEmpty();
  });
});
