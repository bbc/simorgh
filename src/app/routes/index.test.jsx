import React from 'react';
import { matchPath } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { MemoryRouter } from 'react-router-dom';

// test helpers
import fetchMock from 'fetch-mock';

import defaultToggles from '#lib/config/toggles';

// components being tested

// mock data
import featureIndexPageJson from '#data/afrique/cpsAssets/48465371.json';
import podcastPageJson from '#data/arabic/podcasts/p02pc9qc.json';
import legacyMediaAssetPage from '#data/azeri/legacyAssets/multimedia/2012/09/120919_georgia_prison_video.json';
import onDemandRadioPageJson from '#data/indonesia/bbc_indonesian_radio/w172xh267fpn19l.json';
import photoGalleryPageJson from '#data/indonesia/cpsAssets/indonesia-41635759.json';
import liveRadioPageJson from '#data/korean/bbc_korean_radio/liveradio.json';
import homePageJson from '#data/kyrgyz/homePage/index.json';
import storyPageJson from '#data/mundo/cpsAssets/noticias-internacional-51266689.json';
import storyPageRecommendationsData from '#data/mundo/recommendations/index.json';
import onDemandTvPageJson from '#data/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json';
import articlePageJson from '#data/persian/articles/c4vlle3q337o.json';
import storyPageMostReadData from '#data/pidgin/mostRead/index.json';
import mostWatchedData from '#data/pidgin/mostWatched/index.json';
import frontPageJson from '#data/serbian/frontpage/lat.json';
import sportArticlePageJson from '#data/sport/judo/articles/cj80n66ddnko.json';
import indexPageJson from '#data/ukrainian/ukraine_in_russian';
import mediaAssetPageJson from '#data/yoruba/cpsAssets/media-23256797.json';

import { ERROR_PAGE, FRONT_PAGE } from '#app/routes/utils/pageTypes';
import routes from '.';
import {
  act,
  render,
  screen,
} from '../components/react-testing-library-with-providers';
import { suppressPropWarnings } from '../legacy/psammead/psammead-test-helpers/src';
import * as fetchDataFromBFF from './utils/fetchDataFromBFF';

fetchMock.config.fallbackToNetwork = true; // ensures non mocked requests fallback to an actual network request

global.performance.getEntriesByName = jest.fn(() => []);

// mock pages/index.js to return a non async page component
jest.mock('../pages');

const agent = { ca: 'ca', key: 'key' };
const getAgent = jest.fn(() => agent);

const getMatchingRoute = pathname =>
  routes.find(({ path }) =>
    matchPath(pathname, {
      path,
      exact: true,
    }),
  );

const renderRouter = props =>
  act(async () => {
    render(
      <MemoryRouter initialEntries={[props.pathname]}>
        {renderRoutes(routes, {
          bbcOrigin: 'https://www.bbc.com',
          isApp: false,
          isAmp: false,
          status: props.status || 200,
          toggles: defaultToggles.local,
          ...props,
        })}
      </MemoryRouter>,
      {
        service: props.service,
        variant: props.variant,
      },
    );
  });

describe('Routes', () => {
  beforeEach(() => {
    jest.setTimeout(10000);

    // Mocks out CanonicalAdBootstrapJs script
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
    delete process.env.SIMORGH_APP_ENV;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    fetchMock.restore();
    fetch.resetMocks();
    window.dotcom = undefined;
  });

  describe('Main page', () => {
    it('should have correct properties in each route', () => {
      routes.forEach((route, index) => {
        expect(route).toEqual(expect.any(Object));
        expect(route).toHaveProperty('component');
        expect(route).toHaveProperty('pageType');

        // Last route should be catchall (no path specified) error page
        if (index === routes.length - 1) {
          expect(route.pageType).toEqual(ERROR_PAGE);
          expect(route).not.toHaveProperty('path');
        } else {
          expect(route).toHaveProperty('path');
        }
      });
    });

    it('should route to and render live radio page', async () => {
      const pathname = '/korean/bbc_korean_radio/liveradio';
      fetchMock.mock(
        `http://localhost${pathname}.json?renderer_env=live`,
        liveRadioPageJson,
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
        toggles: {
          liveRadioSchedule: { enabled: true },
        },
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'korean',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'BBC 코리아 라디오';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render the podcast page', async () => {
      const pathname = '/arabic/podcasts/p02pc9qc';
      fetchMock.mock(
        `http://localhost${pathname}.json?renderer_env=live`,
        podcastPageJson,
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
        toggles: {
          recentAudioEpisodes: { enabled: false, value: 4 },
        },
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'arabic',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'BBC Xtra';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it.each`
      pathname              | description
      ${'/kyrgyz/tipohome'} | ${'tipohome'}
      ${'/kyrgyz'}          | ${'home'}
    `(
      'should route to and render a $description page',
      async ({ pathname }) => {
        suppressPropWarnings(['children', 'string', 'MediaIcon']);
        suppressPropWarnings(['children', 'PromoTimestamp', 'undefined']);
        suppressPropWarnings(['timestamp', 'TimestampContainer', 'undefined']);

        process.env.SIMORGH_APP_ENV = 'local';

        homePageJson.data.metadata = {
          type: 'home',
          ...homePageJson.data.metadata,
        };

        fetch.mockResponse(JSON.stringify({ ...homePageJson }));

        const { getInitialData, pageType } = getMatchingRoute(pathname);
        const { pageData } = await getInitialData({
          path: pathname,
          service: 'kyrgyz',
          pageType,
        });

        await renderRouter({
          pathname,
          pageData,
          pageType,
          service: 'kyrgyz',
        });
        const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
          'АКШ: жаңы президент ким экенин аныктаган штаттар кайсылар?';

        expect(
          await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
        ).toBeInTheDocument();
      },
    );

    it('should route to and render the onDemand Radio page', async () => {
      const pathname = '/indonesia/bbc_indonesian_radio/w172xh267fpn19l';
      fetchMock.mock(
        `http://localhost${pathname}.json?renderer_env=live`,
        onDemandRadioPageJson,
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
        toggles: {
          recentAudioEpisodes: { enabled: false, value: 4 },
        },
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'indonesia',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'Dunia Pagi Ini';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render the onDemand TV Brand page', async () => {
      const pathname = '/indonesia/bbc_indonesian_tv/tv_programmes/w13xttn4';
      fetchMock.mock(
        `http://localhost${pathname}.json?renderer_env=live`,
        onDemandTvPageJson,
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
        toggles: {
          recentVideoEpisodes: { enabled: false, value: 4 },
        },
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'pashto',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'نړۍ دا وخت';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a front page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const service = 'serbian';
      const variant = 'lat';
      const pathname = `/${service}/${variant}`;

      fetch.mockResponse(
        JSON.stringify({
          ...frontPageJson,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service,
        variant,
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service,
        variant,
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = 'Top Stories';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a most watched page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const pathname = '/pidgin/media/video';
      fetchMock.mock(
        'http://localhost/pidgin/mostwatched.json',
        mostWatchedData,
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service: 'pidgin',
        pageType,
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'pidgin',
      });
      const EXPECTED_TITLE_RENDERED_IN_DOCUMENT = 'De one we dem don look';

      expect(
        await screen.findByText(EXPECTED_TITLE_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a media asset page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const pathname = '/yoruba/media-23256797';

      fetch.mockResponse(
        JSON.stringify({
          ...mediaAssetPageJson,
          secondaryData: { mostWatched: mostWatchedData },
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service: 'yoruba',
        pageType,
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'yoruba',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'Ko ko koo, "lọdun 2014 bi ana ni arun buruku yii wọle tọ mi wa" introduction.';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a legacy media asset page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const pathname = '/azeri/multimedia/2012/09/120919_georgia_prison_video';

      fetch.mockResponse(
        JSON.stringify({
          ...legacyMediaAssetPage,
          secondaryData: { mostWatched: mostWatchedData },
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service: 'azeri',
        pageType,
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'azeri',
      });

      // TODO: use headline text when double headline bug is fixed https://github.com/bbc/simorgh/issues/5688
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'Gürcustanda məhbusların gözətçilər tərəfindən zorlandığını göstərən video görüntülər çərşənbə günü hökümətə qarşı nümayişlərlə nəticələnib.';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a photo gallery page', async () => {
      const pathname = '/indonesia/indonesia-41635759';

      fetch.mockResponse(
        JSON.stringify({
          ...photoGalleryPageJson,
          secondaryData: null,
          recommendations: storyPageRecommendationsData,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'indonesia',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'Anies Baswedan, dari mantan menteri menjadi gubernur DKI Jakarta';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a story page', async () => {
      suppressPropWarnings(['optimizely', 'ForwardRef', 'null']);

      const pathname = '/mundo/noticias-internacional-51266689';
      fetch.mockResponse(
        JSON.stringify({
          ...storyPageJson,
          secondaryData: { mostRead: storyPageMostReadData },
          recommendations: storyPageRecommendationsData,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service: 'mundo',
        pageType: 'cpsAsset',
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'mundo',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'Brexit: qué cambiará para visitar, trabajar y estudiar en Reino Unido tras la salida del país de la Unión Europea';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    }, 15000);

    it('should route to and render an index page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const pathname = '/ukrainian/ukraine_in_russian';
      fetch.mockResponse(
        JSON.stringify({
          ...indexPageJson,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        service: 'ukrainian',
      });
      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'ukrainian',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'В Украине введено военное положение, во многих городах, в том числе Киеве, слышны взрывы.';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a feature index page', async () => {
      process.env.SIMORGH_APP_ENV = 'local';
      const pathname = '/afrique/48465371';

      fetch.mockResponse(
        JSON.stringify({
          ...featureIndexPageJson,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        pageType,
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'afrique',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'CAN 2019 : le Sénégal qualifié pour les huitièmes de finale';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a 500 error page', async () => {
      const pathname = '/igbo/500';
      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { errorCode } = await getInitialData({
        path: pathname,
        pageType,
      });

      await renderRouter({
        pathname,
        pageType,
        status: errorCode,
        errorCode,
        service: 'igbo',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '500';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should fallback to and render a 500 error page if there is a problem with page data', async () => {
      const pathname = '/afrique';
      fetchMock.mock(`http://localhost${pathname}.json`, 500);

      const { pageType, getInitialData } = getMatchingRoute(pathname);
      const { status, error } = await getInitialData({
        path: pathname,
        pageType,
      });
      await renderRouter({
        pathname,
        pageType: FRONT_PAGE,
        service: 'afrique',
        error: {
          message: error,
        },
        status,
        errorCode: 500,
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '500';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should route to and render a 404 error page', async () => {
      const pathname = '/igbo/404';
      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { errorCode } = await getInitialData({
        path: pathname,
        pageType,
      });
      await renderRouter({
        pathname,
        pageType,
        status: errorCode,
        errorCode,
        service: 'igbo',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should render a 404 error page if a data fetch responds with a 404', async () => {
      const pathname = '/pidgin/articles/cwl08rd38p6o';
      const bffFetchSpy = jest.spyOn(fetchDataFromBFF, 'default');

      bffFetchSpy.mockRejectedValue({ message: 'Not found', status: 404 });

      const { pageType, getInitialData } = getMatchingRoute(pathname);
      const { status, error } = await getInitialData({
        path: pathname,
        pageType,
        service: 'pidgin',
        getAgent,
      });

      await renderRouter({
        pathname,
        pageType,
        status,
        error: {
          message: error,
        },
        errorCode: 404,
        service: 'pidgin',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });

    it('should fallback to and render a 404 error page if no route match is found', async () => {
      const pathname = '/a/path/that/does/not/exist';
      const { pageType, getInitialData } =
        getMatchingRoute(pathname) || routes[routes.length - 1];
      const { errorCode } = await getInitialData({
        path: pathname,
        pageType,
      });
      await renderRouter({
        pathname,
        pageType,
        status: errorCode,
        errorCode,
        service: 'pidgin',
      });
      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT = '404';

      expect(
        await screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).toBeInTheDocument();
    });
  });

  describe('Article page', () => {
    it('should route to and render an article page', async () => {
      suppressPropWarnings([
        'pageData.promo.id',
        'SecondaryColumn',
        'undefined',
      ]);
      suppressPropWarnings(['pageData.promo.id', 'ArticlePage', 'undefined']);

      const pathname = '/persian/articles/c4vlle3q337o';

      fetch.mockResponse(
        JSON.stringify({
          ...articlePageJson,
        }),
      );

      process.env.SIMORGH_APP_ENV = 'local';
      const { getInitialData, pageType } = getMatchingRoute(pathname);
      const { pageData } = await getInitialData({
        path: pathname,
        getAgent,
        service: 'persian',
        pageType,
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'persian',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        'پهپادی که برایتان قهوه می‌آورد';

      expect(
        screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).resolves.toBeInTheDocument();
    });

    it('should route to and render a Sport Discipline article page', async () => {
      const pathname = '/sport/judo/articles/cj80n66ddnko';

      fetch.mockResponse(
        JSON.stringify({
          ...sportArticlePageJson,
        }),
      );

      const { getInitialData, pageType } = getMatchingRoute(pathname);
      process.env.SIMORGH_APP_ENV = 'local';
      const { pageData } = await getInitialData({
        path: pathname,
        getAgent,
        service: 'sport',
        pageType,
      });

      await renderRouter({
        pathname,
        pageData,
        pageType,
        service: 'sport',
      });

      const EXPECTED_TEXT_RENDERED_IN_DOCUMENT =
        "Great Britain's Lucy Renshall won gold at the Baku Grand Slam by defeating Mongolia's Gankhaich Bold in the final.";

      expect(
        screen.findByText(EXPECTED_TEXT_RENDERED_IN_DOCUMENT),
      ).resolves.toBeInTheDocument();
    }, 15000);
  });
});
