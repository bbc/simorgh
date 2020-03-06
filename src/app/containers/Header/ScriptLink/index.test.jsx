import React from 'react';
import { node } from 'prop-types';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { UserContext } from '#contexts/UserContext';
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

/* eslint-disable react/prop-types */
const ScriptLinkContainerWithContext = ({
  serviceContext = serbianServiceConfig.lat,
  requestContext = requestContextMock,
}) => (
  <ServiceContext.Provider value={serviceContext}>
    <UserContext.Provider value={userContextMock}>
      <RequestContext.Provider value={requestContext}>
        <ScriptLinkContainer />
      </RequestContext.Provider>
    </UserContext.Provider>
  </ServiceContext.Provider>
);

describe(`Script Link`, () => {
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
        requestContext: { variant: 'trad' },
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
            otherVariant = 'cyr',
          } = testCases[testCase];

          const { container } = withRouter(
            <ScriptLinkContainerWithContext
              serviceContext={serviceContext}
              requestContext={requestContext}
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
            otherVariant = 'cyr',
          } = testCases[testCase];

          const { container } = withRouter(
            <ScriptLinkContainerWithContext
              serviceContext={serviceContext}
              requestContext={requestContext}
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
  });

  describe('getVariantHref', () => {
    it('should generate correct variant href on a canonical page', () => {
      const path = '/:foo(foo)/:bar(bar):variant(/simp|/trad|/cyr|/lat)';

      expect(
        getVariantHref({
          path,
          params: { foo: 'foo', bar: 'bar', variant: '/lat' },
          variant: 'cyr',
        }),
      ).toEqual('/foo/bar/cyr');
    });

    it('should generate correct variant href on an amp page', () => {
      const path =
        '/:foo(foo)/:bar(bar):variant(/simp|/trad|/cyr|/lat):amp(.amp)?';

      expect(
        getVariantHref({
          path,
          params: { foo: 'foo', bar: 'bar', variant: '/lat', amp: '.amp' },
          variant: 'cyr',
        }),
      ).toEqual('/foo/bar/cyr');
    });
  });
});
