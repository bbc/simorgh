import { matchPath } from 'react-router-dom';
import {
  articleRegexPath,
  articleDataRegexPath,
  articleSwRegexPath,
  articleManifestRegexPath,
  frontpageRegexPath,
  frontpageDataRegexPath,
  frontpageManifestRegexPath,
  frontpageSwRegexPath,
  cpsAssetPageRegexPath,
  cpsAssetPageDataRegexPath,
  mostReadDataRegexPath,
  radioAndTvRegexPathsArray,
} from './index';

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

describe('articleRegexPath', () => {
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
  shouldMatchValidRoutes(validRoutes, articleRegexPath);

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
  shouldNotMatchInvalidRoutes(invalidRoutes, articleRegexPath);
});

describe('articleDataRegexPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo.json',
    '/persian/articles/c7eel0lmr4do.json',
    '/news/articles/c5jje4ejkqvo/lat.json',
    '/persian/articles/c7eel0lmr4do/trad.json',
    '/cymrufyw/erthyglau/c5jje4ejkqvo.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleDataRegexPath);

  const invalidRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/persian/articles/c7eel0lmr4do',
    '/iplayer/articles/c7eel0lmr4do.json',
    '/persian/articles/c7eel0lmr4do/.json',
    '/persian/articles/c7eel0lmr4do/foobar.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleDataRegexPath);
});

describe('frontpageRegexPath', () => {
  const validRoutes = [
    '/news',
    '/persian',
    '/news.amp',
    '/persian.amp',
    '/news/simp',
    '/persian/trad',
    '/news/lat.amp',
    '/persian/cyr.amp',
  ];
  shouldMatchValidRoutes(validRoutes, frontpageRegexPath);

  const invalidRoutes = [
    '/news/home',
    '/persian/c5jje4ejkqvo.amp',
    '/iplayer',
    '/news/foobar',
    '/news/foobar.amp',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageRegexPath);
});

describe('frontpageDataRegexPath', () => {
  const validRoutes = [
    '/news.json',
    '/persian.json',
    '/news/cyr.json',
    '/persian/trad.json',
  ];
  shouldMatchValidRoutes(validRoutes, frontpageDataRegexPath);

  const invalidRoutes = [
    '/news/data.json',
    '/iplayer.json',
    '/news/foobar.json',
    '/persian/.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageDataRegexPath);
});

describe('articleSwRegexPath', () => {
  const validRoutes = [
    '/news/articles/sw.js',
    '/persian/articles/sw.js',
    '/cymrufyw/erthyglau/sw.js',
  ];
  shouldMatchValidRoutes(validRoutes, articleSwRegexPath);

  const invalidRoutes = [
    '/news/sw.js',
    '/persian/articles/sw',
    '/news/trad/sw.js',
    '/cymrufyw/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleSwRegexPath);
});

describe('manifestRegexPath', () => {
  const validRoutes = [
    '/news/articles/manifest.json',
    '/persian/articles/manifest.json',
    '/naidheachdan/sgeulachdan/manifest.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleManifestRegexPath);

  const invalidRoutes = [
    '/news/manifest.json',
    '/persian/articles/manifest',
    '/news/simp/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleManifestRegexPath);
});

describe('frontpageSwRegexPath', () => {
  const validRoutes = ['/news/sw.js', '/persian/sw.js'];
  shouldMatchValidRoutes(validRoutes, frontpageSwRegexPath);

  const invalidRoutes = [
    '/news/articles/sw.js',
    '/persian/sw',
    '/persian/simp/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageSwRegexPath);
});

describe('frontpageManifestRegexPath', () => {
  const validRoutes = ['/news/manifest.json', '/persian/manifest.json'];
  shouldMatchValidRoutes(validRoutes, frontpageManifestRegexPath);

  const invalidRoutes = [
    '/foobar/manifest.json',
    '/foobar/manifest',
    '/news/trad/sw.js',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageManifestRegexPath);
});

describe('mostReadDataRegexPath', () => {
  const validRoutes = ['/news/most_read.json', '/zhongwen/most_read/simp.json'];
  shouldMatchValidRoutes(validRoutes, mostReadDataRegexPath);

  const invalidRoutes = [
    '/foobar/most_read.json',
    '/foobar/most_read',
    '/foobar/most_read.js',
    '/news/trad/most_read.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, mostReadDataRegexPath);
});

jest.mock('../config', () => ({
  gujarati: ['bbc_gujarati_tv'],
  hausa: ['bbc_hausa_radio', 'bbc_afrique_tv'],
  indonesia: ['bbc_indonesian_radio'],
  marathi: ['bbc_marathi_tv'],
  persian: ['bbc_persian_radio', 'bbc_dari_radio', 'bbc_persian_tv'],
}));

describe('radioAndTvRegexPathsArray', () => {
  describe('should return an array of regexs for the radio config', () => {
    const validRoutes = [
      '/hausa/bbc_hausa_radio/liveradio',
      '/indonesia/bbc_indonesian_radio/w34rfd4k',
      '/persian/bbc_persian_radio/abcd1234',
      '/persian/bbc_dari_radio/liveradio',
      '/hausa/bbc_hausa_radio/liveradio.amp',
      '/hausa/bbc_hausa_radio/abcd1234.amp',
    ];
    shouldMatchValidRoutes(validRoutes, radioAndTvRegexPathsArray);

    const invalidRoutes = [
      '/hausa/bbc_persian_radio/liveradio',
      '/persian/bbc_hausa_radio/abcd1234.amp',
      '/hausa/bbc_hausa_radio/',
      '/hausa/bbc_hausa_radio/.amp',
      '/foobar/bbc_hausa_radio/liveradio',
      '/persian/foobar/liveradio',
      '/persian/foobar/liveradio.amp',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, radioAndTvRegexPathsArray);
  });

  describe('should return an array of regexs for the tv config', () => {
    const validRoutes = [
      '/marathi/bbc_marathi_tv/livetv',
      '/marathi/bbc_marathi_tv/w34rfd4k',
      '/gujarati/bbc_gujarati_tv/abcd1234',
      '/persian/bbc_persian_tv/abcd1234.amp',
    ];
    shouldMatchValidRoutes(validRoutes, radioAndTvRegexPathsArray);

    const invalidRoutes = [
      '/persian/bbc_marathi_tv/livetv',
      '/gujarati/bbc_burmese_tv/abcd1234',
      '/gujarati/bbc_burmese_tv/abcd1234.amp',
      '/marathi/bbc_marathi_tv/',
      '/marathi/bbc_marathi_tv/.amp',
      '/blah/bbc_hausa_radio/livetv',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, radioAndTvRegexPathsArray);
  });
  describe('cpsAssetPageRegexPath', () => {
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
      '/zhongwen/test-12345678/simp',
      '/zhongwen/test-12345678/trad',
      '/zhongwen/test-12345678/simp.amp',
    ];

    shouldMatchValidRoutes(validRoutes, cpsAssetPageRegexPath);

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
    ];
    shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPageRegexPath);
  });

  describe('cpsAssetPageDataRegexPath', () => {
    const validRoutes = [
      '/pidgin/12345678.json',
      '/pidgin/test-49450859.json',
      '/kyrgyz/test-tv-48695523.json',
      '/mundo/test_underscore-12345678.json',
      '/zhongwen/test-12345678/simp.json',
      '/zhongwen/test-12345678/trad.json',
    ];

    shouldMatchValidRoutes(validRoutes, cpsAssetPageDataRegexPath);

    // According to CPS a valid assetUri should have 8 digits or more and CPS index is optional
    const inValidRoutes = [
      '/pidgin/1234567.json',
      '/pidgin/12345678',
      '/pidgin/test-494859.json',
      '/blah/test-49450859.json',
      '/pidgin/test-49450859',
      '/pidgin/test-49450859/.json',
      '/pidgin/test-494859.amp.json',
    ];
    shouldNotMatchInvalidRoutes(inValidRoutes, cpsAssetPageDataRegexPath);
  });
});
