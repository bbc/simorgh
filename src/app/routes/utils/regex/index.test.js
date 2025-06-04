import { matchPath } from 'react-router-dom';
import {
  articleDataPath,
  articlePath,
  cpsAssetPageDataPath,
  cpsAssetPagePath,
  homePagePath,
  homePageDataPath,
  homePageManifestPath,
  homePageSwPath,
  legacyAssetPageDataPath,
  legacyAssetPagePath,
  liveRadioPath,
  mostReadDataRegexPath,
  onDemandRadioPath,
  onDemandTvPath,
  podcastBrandPath,
  podcastEpisodePath,
  secondaryColumnDataRegexPath,
  topicPath,
} from './index';

import serviceConfig from '../../../lib/config/services/loadableConfig';
import { getHomePageRegex } from './utils/index';

jest.mock('#server/utilities/serviceConfigs', () => ({
  news: {},
  persian: {},
}));

const matchRoute = (route, pathValue) => {
  const match = matchPath(route, {
    path: pathValue,
    exact: true,
    strict: true,
  });

  return match ? match.isExact : false;
};

const shouldMatchValidRoutes = (routes, pathValue) => {
  it.each(routes)('should match valid route %s', route => {
    expect(matchRoute(route, pathValue)).toBe(true);
  });
};

const shouldNotMatchInvalidRoutes = (routes, pathValue) => {
  it.each(routes)('should not match invalid route %s', route => {
    expect(matchRoute(route, pathValue)).toBe(false);
  });
};

describe('articlePath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/news/articles/c5jje4ejkqvo.amp',
    '/persian/articles/c7eel0lmr4do',
    '/news/articles/c5jje4ejkqvo/simp',
    '/news/articles/c5jje4ejkqvo/trad.amp',
    '/persian/articles/c7eel0lmr4do/lat',
    '/cymrufyw/erthyglau/c7eel0lmr4do',
    '/cymrufyw/erthyglau/c7eel0lmr4do.amp',
    '/naidheachdan/sgeulachdan/c7eel0lmr4do',
  ];
  shouldMatchValidRoutes(validRoutes, articlePath);

  const invalidRoutes = [
    '/iplayer/articles/c5jje4ejkqvo',
    '/news/article/c5jje4ejkqvo.amp',
    '/persian/c7eel0lmr4do',
    '/news/articles/c12o',
    '/news/articles/c5jje4ejkqv',
    '/news/articles/',
    '/news/articles/c5jje4ejkqvo/foobar',
    '/news/articles/c5jje4ejkqvo/.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articlePath);
});

describe('articleDataPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo.json',
    '/persian/articles/c7eel0lmr4do.json',
    '/news/articles/c5jje4ejkqvo/lat.json',
    '/persian/articles/c7eel0lmr4do/trad.json',
    '/cymrufyw/erthyglau/c5jje4ejkqvo.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleDataPath);

  const invalidRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/persian/articles/c7eel0lmr4do',
    '/iplayer/articles/c7eel0lmr4do.json',
    '/persian/articles/c7eel0lmr4do/.json',
    '/persian/articles/c7eel0lmr4do/foobar.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleDataPath);
});

describe('homePagePath', () => {
  const invalidRoutes = [
    '/news/home',
    '/persian/c5jje4ejkqvo.amp',
    '/iplayer',
    '/news/foobar',
    '/news/foobar.amp',
    '/kyrgyz.amp',
    '/serbian/lat.amp',
    '/serbian/cyr.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, homePagePath);
});

describe('homePageDataPath', () => {
  const invalidRoutes = [
    '/news/data.json',
    '/iplayer.json',
    '/news/foobar.json',
    '/persian/.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, homePageDataPath);
});

describe('homePageSwPath', () => {
  const validRoutes = ['/gahuza/sw.js', '/persian/sw.js'];
  shouldMatchValidRoutes(validRoutes, homePageSwPath);

  const invalidRoutes = [
    '/news/sw.js',
    '/news/articles/sw.js',
    '/persian/sw',
    '/persian/simp/sw.js',
    '/gahuza/articles/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, homePageSwPath);
});

describe('homePageManifestPath', () => {
  const validRoutes = ['/persian/manifest.json', '/serbian/manifest.json'];
  shouldMatchValidRoutes(validRoutes, homePageManifestPath);

  const invalidRoutes = [
    '/news/manifest.json',
    '/sport/manifest.json',
    '/naidheachdan/manifest.json',
    '/cymrufyw/manifest.json',
    '/newsround/manifest.json',
    '/foobar/manifest.json',
    '/foobar/manifest',
    '/news/trad/sw.js',
    '/persian/articles/manifest.json',
    '/serbian/articles/manifest.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, homePageManifestPath);
});

describe('onDemandRadioPath', () => {
  const validRoutes = [
    '/indonesia/bbc_indonesian_radio/w34rfd4k', // onDemand radio any media id
    '/persian/bbc_abcdefg_radio/hijklmn', // onDemand radio with a-z inside service id and for media id
    '/arabic/bbc_arabic_radio/radioschedule', // default radio schedule route
    '/indonesia/bbc_indonesian_radio/programmes/w34rfd4k', // onDemand radio brand any media id
    '/zhongwen/simp/bbc_cantonese_radio/w5192pdkg', // onDemand radio with valid variant
  ];
  shouldMatchValidRoutes(validRoutes, onDemandRadioPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_radio/',
    '/hausa/bbc_hausa_radio/.amp',
    '/foobar/bbc_hausa_radio/abcd1234',
    '/persian/foobar/abcd1234',
    '/persian/foobar/abcd1234.amp',
    '/indonesia/bbc_indonesian_radio/programmes/',
    '/zhongwen/troll/bbc_cantonese_radio/w5192pdkg', // onDemand radio with invalid variant
    '/hausa/bbc_hausa_radio/abcd1234.amp', // onDemand radio amp w/ any media id
    '/indonesia/bbc_indonesian_radio/programmes/w34rfd4k.amp', // onDemand radio brand amp any media id
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, onDemandRadioPath);
});

describe('liveRadioPath', () => {
  const validRoutes = [
    '/hausa/bbc_hausa_radio/liveradio', // default live radio
    '/persian/bbc_dari_radio/liveradio', // live radio other service
    '/hausa/bbc_persian_radio/liveradio', // service with non matching live radio service id
  ];
  shouldMatchValidRoutes(validRoutes, liveRadioPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_radio/', // live radio with no media id
    '/hausa/bbc_hausa_radio/.amp', // live radio with no media id amp
    '/hausa/bbc_hausa_radio/liveradio.amp', // live radio amp
    '/foobar/bbc_hausa_radio/liveradio', // live radio w/ unknown service
    '/persian/foobar/liveradio', // live radio w/ non-formatted service id
    '/persian/foobar/liveradio.amp', // live radio w/ non-formatted service id amp
    '/blah/bbc_hausa_radio/livetv', // live radio w/ unknown service
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, liveRadioPath);
});

describe('podcastEpisodePath', () => {
  const validRoutes = ['/arabic/podcasts/654joro456/j0r0r0j'];
  shouldMatchValidRoutes(validRoutes, podcastEpisodePath);

  const invalidRoutes = [
    '/burmese/podcast/98fjf9302/294fjfms', // podcast brand page
    '/burmese/98fjf9302/294fjfms', // podcast missing
    '/zhongwen/trad/39ddjd8d9/39djdwwiw.amp', // variant without podcast
    '/burmese/podcasts/987ger/ald321.amp',
    '/zhongwen/trad/podcasts/938495544/jf84hgf0sa.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, podcastEpisodePath);
});

describe('podcastBrandPath', () => {
  const validRoutes = [
    '/arabic/podcasts/432rpk234',
    '/zhongwen/trad/podcasts/457mcg155',
  ];
  shouldMatchValidRoutes(validRoutes, podcastBrandPath);

  const invalidRoutes = [
    '/arabic/bbc_arabic_radio/6865933', // includes masterbrand
    '/arabic/bbc_arabic_radio/podcasts/6865933', // includes masterbrand
    '/zhongwen/trad/94jf92oe', // variant without podcast
    '/zhongwen/trad/39ddjd8d9amp', // variant without podcast
    '/zhongwen/trad/podcasts/938495544.amp',
    '/burmese/podcasts/657mnayr.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, podcastBrandPath);
});

describe('mostReadDataRegexPath', () => {
  const validRoutes = ['/news/mostread.json', '/zhongwen/mostread/simp.json'];
  shouldMatchValidRoutes(validRoutes, mostReadDataRegexPath);

  const invalidRoutes = [
    '/foobar/mostread.json',
    '/foobar/mostread',
    '/foobar/mostread.js',
    '/news/trad/mostread.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, mostReadDataRegexPath);
});

describe('secondaryColumnDataRegexPath', () => {
  const validRoutes = [
    '/mundo/sty-secondary-column.json',
    '/zhongwen/sty-secondary-column/simp.json',
  ];
  shouldMatchValidRoutes(validRoutes, secondaryColumnDataRegexPath);

  const invalidRoutes = [
    '/foobar/sty-secondary-column.json',
    '/foobar/sty-secondary-column',
    '/foobar/sty-secondary-column.js',
    '/news/trad/sty-secondary-column.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, secondaryColumnDataRegexPath);
});

describe('onDemandTvPath', () => {
  const validRoutes = [
    '/indonesia/bbc_indonesian_tv/tv/w34rfd4k',
    '/indonesia/bbc_indonesian_tv/tv_programmes/w4321',
  ];
  shouldMatchValidRoutes(validRoutes, onDemandTvPath);

  const invalidRoutes = [
    '/hausa/bbc_hausa_tv/',
    '/hausa/bbc_hausa_tv/.amp',
    '/hausa/bbc_hausa_tv/wr321',
    '/hausa/bbc_hausa_tv/wr321.amp',
    '/foobar/bbc_hausa_tv/abcd1234',
    '/foobar/bbc_hausa_tv/abcd1234.amp',
    '/persian/foobar/abcd1234',
    '/persian/foobar/abcd1234.amp',
    '/indonesia/bbc_indonesian_tv/tv_programmes/',
    '/indonesia/bbc_indonesian_tv/tv/',
    '/indonesia/bbc_indonesian_tv/tv/w34rfd4k.amp',
    '/indonesia/bbc_indonesian_tv/tv_programmes/w4321.amp',
    '/persian/bbc_persian_tv/tv_programmes/abcd1234.amp',
    '/persian/bbc_persian_tv/tv/abcd4321.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, onDemandTvPath);
});

describe('cpsAssetPagePath', () => {
  const validRoutes = [
    '/pidgin/12345678',
    '/pidgin/12345678.amp',
    '/pidgin/tori-49450859',
    '/pidgin/tori-49450859.amp',
    '/yoruba/media-49450859',
    '/yoruba/media-49450859.amp',
    '/punjabi/international-49567825',
    '/punjabi/international-49567825.amp',
    '/kyrgyz/sapar-tv-48695523',
    '/mundo/test_underscore-12345678',
    '/zhongwen/simp/test-12345678',
    '/zhongwen/trad/test-12345678',
    '/zhongwen/simp/test-12345678.amp',
    '/cymrufyw/etholiad-2017-39407507',
    '/cymrufyw/etholiad-2017-39407507.amp',
    '/news/world-middle+east-10642960.amp',
  ];

  shouldMatchValidRoutes(validRoutes, cpsAssetPagePath);

  // According to CPS a valid assetUri should have 8 digits or more and CPS index is optional
  const inValidRoutes = [
    '/pidgin/1234567',
    '/pidgin/12345678/.amp',
    '/blah/12345678',
    '/pidgin/test-494859',
    '/blah/test-49450859',
    '/pidgin/test-49450859/.amp',
    '/pidgin/test-49450859/',
    '/pidgin/test-494859.amp',
    // Below are legacy asset routes - should not match CPS routes
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPagePath);
});

describe('cpsAssetPageDataPath', () => {
  const validRoutes = [
    '/pidgin/12345678.json',
    '/pidgin/test-49450859.json',
    '/kyrgyz/test-tv-48695523.json',
    '/mundo/test_underscore-12345678.json',
    '/zhongwen/simp/test-12345678.json',
    '/zhongwen/trad/test-12345678.json',
  ];

  shouldMatchValidRoutes(validRoutes, cpsAssetPageDataPath);

  // According to CPS a valid assetUri should have 8 digits or more and CPS index is optional
  const inValidRoutes = [
    '/pidgin/1234567.json',
    '/pidgin/12345678',
    '/pidgin/test-494859.json',
    '/blah/test-49450859.json',
    '/pidgin/test-49450859',
    '/pidgin/test-49450859/.json',
    '/pidgin/test-494859.amp.json',
    // Below are legacy asset routes - should not match CPS routes
    '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl.json',
    '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery.json',
  ];
  shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPageDataPath);
});

const validLegacyPageRoutes = [
  '/sinhala/sri_lanka/2015/02/150218_mahinda_rally_sl',
  '/hausa/multimedia/2014/05/140528_hip_hop_40years_gallery',
  '/zhongwen/simp/multimedia/2016/05/160511_vid_cultural_revolution_explainer',
  '/ukchina/simp/cool_britannia/people_in_uk/2016/09/160927_people_lord_mayor',
  '/ukchina/simp/elt/english_now/2014/12/141205_media_english_hiv',
  '/ukchina/simp/uk_education/tianshu/091124_tianshu_iv_cityvc2',
  '/ukchina/trad/in_depth/cluster_brazil_worldcup',
  '/vietnamese/in_depth/us_election_2016',
];

const invalidLegacyPageRoutes = [
  '/ukchina',
  '/ukchina/',
  '/ukchina/simp',
  '/ukchina/simp/',
];

describe('legacyAssetPagePath', () => {
  shouldMatchValidRoutes(validLegacyPageRoutes, legacyAssetPagePath);

  shouldNotMatchInvalidRoutes(invalidLegacyPageRoutes, legacyAssetPagePath);
});

describe('legacyAssetPageDataPath', () => {
  const validDataRoutes = validLegacyPageRoutes.map(route => `${route}.json`);

  shouldMatchValidRoutes(validDataRoutes, legacyAssetPageDataPath);

  const invalidDataRoutes = invalidLegacyPageRoutes.map(route => {
    let path = route;
    if (route.endsWith('/')) {
      path = route.slice(0, -1);
    }

    return `${path}.json`;
  });
  shouldNotMatchInvalidRoutes(invalidDataRoutes, legacyAssetPageDataPath);
});

describe('homepages on environments', () => {
  const services = Object.keys(serviceConfig);

  const serviceToRoute = service => `/${service}`;

  const migratedServices = [
    'afaanoromoo',
    'afrique',
    'amharic',
    'arabic',
    'azeri',
    'bengali',
    'burmese',
    'gahuza',
    'gujarati',
    'hausa',
    'hindi',
    'igbo',
    'indonesia',
    'japanese',
    'kyrgyz',
    'korean',
    'marathi',
    'mundo',
    'nepali',
    'pashto',
    'persian',
    'pidgin',
    'portuguese',
    'punjabi',
    'russian',
    'serbian',
    'sinhala',
    'somali',
    'swahili',
    'tamil',
    'telugu',
    'thai',
    'tigrinya',
    'turkce',
    'ukrainian',
    'urdu',
    'uzbek',
    'vietnamese',
    'yoruba',
    'zhongwen',
  ];
  const migratedWorldServiceRoutes = migratedServices.map(serviceToRoute);

  const originalApplicationEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalApplicationEnvironment;
  });

  describe(`homePage regex on the local environment`, () => {
    process.env.SIMORGH_APP_ENV = 'local';

    const homePageRegex = getHomePageRegex(services);

    shouldMatchValidRoutes(migratedWorldServiceRoutes, homePageRegex);
  });
});

describe('topicPath', () => {
  const validRoutes = [
    '/zhongwen/topics/cd6qem06z92t/trad',
    '/zhongwen/topics/c1ez1k4emn0t/trad',
    '/serbian/topics/cr50vdy9q6wt/lat',
    '/serbian/topics/c2lej05e1eqt/lat',
    '/pidgin/topics/c2dwqd1zr92t',
  ];
  shouldMatchValidRoutes(validRoutes, topicPath);

  const invalidRoutes = [
    '/serbian/lat/topics/c2lej05e1eqt',
    '/serbian/lat/topics/c2lej05qwesae1eqt',
    '/zhongwen/c1ez1k4emn0t',
    '/zhongwen/trad/topics',
    '/hindi/topic/c5jje4ejkqv',
    '/mundo/topic/',
    '/serbian/topic/c5jje4ejkqvo/foobar',
    '/urdu/topic/c5jje4ejkqvo/.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, topicPath);
});
