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
  mediaRadioRegexArray,
  mediaTvRegexArray,
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
  servicesWithRadio: {
    hausa: ['bbc_hausa_radio'],
    indonesia: ['bbc_indonesian_radio'],
    persian: ['bbc_persian_radio', 'bbc_dari_radio'],
  },
  servicesWithTv: {
    afrique: ['bbc_afrique_tv'],
    burmese: ['bbc_burmese_tv'],
    gujarati: ['bbc_gujarati_tv'],
    test: ['bbc_foobar_tv'],
  },
}));

describe('mediaRadioRegexArray', () => {
  describe('should return an array of regexs for the servicesWithRadio config', () => {
    const validRoutes = [
      '/hausa/bbc_hausa_radio/liveradio',
      '/indonesia/bbc_indonesian_radio/w34rfd4k',
      '/persian/bbc_persian_radio/abcd1234',
      '/persian/bbc_dari_radio/liveradio',
    ];
    shouldMatchValidRoutes(validRoutes, mediaRadioRegexArray);

    const invalidRoutes = [
      '/hausa/bbc_persian_radio/liveradio',
      '/persian/bbc_hausa_radio/abcd1234',
      '/hausa/bbc_hausa_radio/',
      '/foobar/bbc_hausa_radio/liveradio',
      '/persian/foobar/liveradio',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, mediaRadioRegexArray);
  });
});

describe('mediaTvRegexArray', () => {
  describe('should return an array of regexs for the servicesWithRadio config', () => {
    const validRoutes = [
      '/afrique/bbc_afrique_tv/livetv',
      '/burmese/bbc_burmese_tv/w34rfd4k',
      '/gujarati/bbc_gujarati_tv/abcd1234',
      '/test/bbc_foobar_tv/livetv',
      '/test/bbc_foobar_tv/1234abc5678',
    ];
    shouldMatchValidRoutes(validRoutes, mediaTvRegexArray);

    const invalidRoutes = [
      '/burmese/bbc_afrique_tv/livetv',
      '/gujarati/bbc_burmese_tv/abcd1234',
      '/afrique/bbc_afrique_tv/',
      '/blah/bbc_hausa_radio/livetv',
      '/burmese/blah/livetv',
    ];
    shouldNotMatchInvalidRoutes(invalidRoutes, mediaTvRegexArray);
  });
});
