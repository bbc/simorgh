import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { RequestContext, RequestContextProps } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import {
  articlePath,
  cpsAssetPagePath,
  errorPagePath,
  homePagePath,
  legacyAssetPagePath,
  topicPath,
} from '#app/routes/utils/regex';
import { render } from '../../react-testing-library-with-providers';
import { service as ukChinaServiceConfig } from '../../../lib/config/services/ukchina';
import { service as serbianServiceConfig } from '../../../lib/config/services/serbian';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ScriptLinkContainer, { getVariantHref } from '.';
import ThemeProvider from '../../ThemeProvider';

const requestContextMock = {
  variant: 'lat',
  env: 'test',
  isNextJs: false,
};

const withRouter = (
  component: React.ReactElement,
  matchPath: string,
  path: string,
) => {
  const Wrapper = (
    <MemoryRouter initialEntries={[path]}>
      <Route path={matchPath}>{component}</Route>
    </MemoryRouter>
  );

  return {
    ...render(Wrapper),
  };
};

const defaultToggleState = {
  scriptLink: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
};

const mockToggleDispatch = jest.fn();

const toggleContextMock = {
  toggleState: defaultToggleState,
  toggleDispatch: mockToggleDispatch,
};

const ScriptLinkContainerWithContext = ({
  serviceContext = serbianServiceConfig.lat,
  requestContext = requestContextMock,
  toggleContext = toggleContextMock,
  ...props
}) => (
  <ThemeProvider service="serbian" variant="lat">
    <ToggleContext.Provider value={toggleContext}>
      <ServiceContext.Provider value={serviceContext}>
        <RequestContext.Provider value={requestContext as RequestContextProps}>
          <ScriptLinkContainer {...props} />
        </RequestContext.Provider>
      </ServiceContext.Provider>
    </ToggleContext.Provider>
  </ThemeProvider>
);

describe(`Script Link`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/serbian/lat']}>
        <Route path={homePagePath}>
          <ScriptLinkContainerWithContext />
        </Route>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

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
      homePage: {
        matchPath: homePagePath,
        path: '/serbian/lat',
        variantPath: '/serbian/cyr',
      },
      legacyAssetPage: {
        matchPath: legacyAssetPagePath,
        path: '/ukchina/trad/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs',
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
            // @ts-expect-error type inference issue
            serviceContext = serbianServiceConfig.lat,
            // @ts-expect-error type inference issue
            requestContext = requestContextMock,
            // @ts-expect-error type inference issue
            toggleContext = toggleContextMock,
            // @ts-expect-error type inference issue
            otherVariant = 'cyr',
          } = testCases[testCase as keyof typeof testCases];

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
          ) as Element;

          expect(scriptLink.getAttribute('href')).toBe(variantPath);
        });
      });
      it(`Script Link should contain link to other variant when on topic page`, () => {
        const matchPath = topicPath;
        const path = '/serbian/lat/topics/c06g871g3knt';
        const variantPath = '/serbian/cyr/topics/c7zp707dy8yt';
        const otherVariant = 'cyr';

        const { container } = withRouter(
          <ScriptLinkContainerWithContext scriptSwitchId="c7zp707dy8yt" />,
          matchPath,
          path,
        );

        const scriptLink = container.querySelector(
          `a[data-variant="${otherVariant}"]`,
        ) as Element;

        expect(scriptLink.getAttribute('href')).toBe(variantPath);
      });
    });

    describe('amp', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { errorPage, ...ampTestCases } = testCases;
      Object.keys(ampTestCases).forEach(testCase => {
        it(`Script Link should contain link to other variant when on ${testCase}`, () => {
          const {
            matchPath,
            path,
            variantPath,
            // @ts-expect-error type inference issue
            serviceContext = serbianServiceConfig.lat,
            // @ts-expect-error type inference issue
            requestContext = requestContextMock,
            // @ts-expect-error type inference issue
            toggleContext = toggleContextMock,
            // @ts-expect-error type inference issue
            otherVariant = 'cyr',
          } = testCases[testCase as keyof typeof testCases];

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
          ) as Element;

          expect(scriptLink.getAttribute('href')).toBe(`${variantPath}`);
        });
      });
    });
  });

  describe('getVariantHref', () => {
    it('should generate correct variant href on a canonical page', () => {
      const path = '/:foo(foo)/:bar(bar):variant(/simp|/trad|/cyr|/lat)';

      expect(
        getVariantHref({
          path,
          params: { foo: 'foo', bar: 'bar', variant: '/lat' } as Record<
            string,
            string
          >,
          service: 'serbian',
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
      scriptLink: {
        enabled: false,
      },
      variantCookie: {
        enabled: false,
      },
    };
    const { container } = withRouter(
      <ScriptLinkContainerWithContext
        toggleContext={{
          toggleState: testToggles,
          toggleDispatch: mockToggleDispatch,
        }}
      />,
      homePagePath,
      '/serbian/lat',
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when app is Next.JS', () => {
    const { container } = withRouter(
      <ScriptLinkContainerWithContext
        requestContext={{
          variant: 'lat',
          env: 'test',
          isNextJs: true,
        }}
      />,
      homePagePath,
      '/serbian/lat',
    );
    expect(container).toBeEmptyDOMElement();
  });
});
