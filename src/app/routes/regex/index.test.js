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
  mediaRadioAndTvRegexPathsArray,
} from './index';

jest.mock('../../lib/config/services', () => ({
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
    '/news/articles/c7eel0lmr4do.amp',
  ];
  shouldMatchValidRoutes(validRoutes, articleRegexPath);

  const invalidRoutes = [
    '/iplayer/articles/c5jje4ejkqvo',
    '/news/article/c5jje4ejkqvo.amp',
    '/persian/c7eel0lmr4do',
    '/news/articles/c12o',
    '/news/articles/c5jje4ejkqv',
    '/news/articles/',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleRegexPath);
});

describe('articleDataRegexPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo.json',
    '/persian/articles/c7eel0lmr4do.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleDataRegexPath);

  const invalidRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/persian/articles/c7eel0lmr4do',
    '/iplayer/articles/c7eel0lmr4do.json',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleDataRegexPath);
});

describe('frontpageRegexPath', () => {
  const validRoutes = ['/news', '/persian', '/news.amp', '/persian.amp'];
  shouldMatchValidRoutes(validRoutes, frontpageRegexPath);

  const invalidRoutes = ['/news/home', '/persian/c5jje4ejkqvo.amp', '/iplayer'];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageRegexPath);
});

describe('frontpageDataRegexPath', () => {
  const validRoutes = ['/news.json', '/persian.json'];
  shouldMatchValidRoutes(validRoutes, frontpageDataRegexPath);

  const invalidRoutes = ['/news/data.json', '/iplayer.json'];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageDataRegexPath);
});

describe('swRegexPath', () => {
  const validRoutes = ['/news/articles/sw.js', '/persian/articles/sw.js'];
  shouldMatchValidRoutes(validRoutes, articleSwRegexPath);

  const invalidRoutes = ['/news/sw.js', '/persian/articles/sw'];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleSwRegexPath);
});

describe('manifestRegexPath', () => {
  const validRoutes = [
    '/news/articles/manifest.json',
    '/persian/articles/manifest.json',
  ];
  shouldMatchValidRoutes(validRoutes, articleManifestRegexPath);

  const invalidRoutes = ['/news/manifest.json', '/persian/articles/manifest'];
  shouldNotMatchInvalidRoutes(invalidRoutes, articleManifestRegexPath);
});

describe('frontpageSwRegexPath', () => {
  const validRoutes = ['/news/sw.js', '/persian/sw.js'];
  shouldMatchValidRoutes(validRoutes, frontpageSwRegexPath);

  const invalidRoutes = ['/news/articles/sw.js', '/persian/sw'];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageSwRegexPath);
});

describe('frontpageManifestRegexPath', () => {
  const validRoutes = ['/news/manifest.json', '/persian/manifest.json'];
  shouldMatchValidRoutes(validRoutes, frontpageManifestRegexPath);

  const invalidRoutes = ['/foobar/manifest.json', '/foobar/manifest'];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageManifestRegexPath);
});

jest.mock('../config', () => ({
  gujarati: ['bbc_gujarati_tv'],
  hausa: ['bbc_hausa_radio', 'bbc_afrique_tv'],
  indonesia: ['bbc_indonesian_radio'],
  marathi: ['bbc_marathi_tv'],
  persian: ['bbc_persian_radio', 'bbc_dari_radio', 'bbc_persian_tv'],
}));

describe('mediaRadioAndTvRegexPathsArray', () => {
  describe('should return an array of regexs for the radio config', () => {
    const validRoutes = [
      '/hausa/bbc_hausa_radio/liveradio',
      '/indonesia/bbc_indonesian_radio/w34rfd4k',
      '/persian/bbc_persian_radio/abcd1234',
      '/persian/bbc_dari_radio/liveradio',
      '/hausa/bbc_hausa_radio/liveradio.amp',
      '/hausa/bbc_hausa_radio/abcd1234.amp',
    ];
    shouldMatchValidRoutes(validRoutes, mediaRadioAndTvRegexPathsArray);

    const invalidRoutes = [
      '/hausa/bbc_persian_radio/liveradio',
      '/persian/bbc_hausa_radio/abcd1234.amp',
      '/hausa/bbc_hausa_radio/',
      '/hausa/bbc_hausa_radio/.amp',
      '/foobar/bbc_hausa_radio/liveradio',
      '/persian/foobar/liveradio',
      '/persian/foobar/liveradio.amp',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, mediaRadioAndTvRegexPathsArray);
  });

  describe('should return an array of regexs for the tv config', () => {
    const validRoutes = [
      '/marathi/bbc_marathi_tv/livetv',
      '/marathi/bbc_marathi_tv/w34rfd4k',
      '/gujarati/bbc_gujarati_tv/abcd1234',
      '/persian/bbc_persian_tv/abcd1234.amp',
    ];
    shouldMatchValidRoutes(validRoutes, mediaRadioAndTvRegexPathsArray);

    const invalidRoutes = [
      '/persian/bbc_marathi_tv/livetv',
      '/gujarati/bbc_burmese_tv/abcd1234',
      '/gujarati/bbc_burmese_tv/abcd1234.amp',
      '/marathi/bbc_marathi_tv/',
      '/marathi/bbc_marathi_tv/.amp',
      '/blah/bbc_hausa_radio/livetv',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, mediaRadioAndTvRegexPathsArray);
  });
});
