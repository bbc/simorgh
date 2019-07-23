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
} from './index';

jest.mock('../../lib/config/services', () => ({
  news: {},
  persian: {},
}));

const matchRoute = (route, regex) => {
  const match = matchPath(route, {
    path: regex,
    exact: true,
    strict: true,
  });

  return match ? match.isExact : false;
};

const shouldMatchValidRoutes = (routes, regex) => {
  it.each(routes)('should match valid route %s', route => {
    expect(matchRoute(route, regex)).toBe(true);
  });
};

const shouldNotMatchInvalidRoutes = (routes, regex) => {
  it.each(routes)('should not match invalid route %s', route => {
    expect(matchRoute(route, regex)).toBe(false);
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
  const validRoutes = [
    '/news',
    '/persian',
    '/news.amp',
    '/persian.amp',
    '/serbian/lat',
    '/serbian/lat.amp',
    '/serbian/cyr',
    '/ukchina/simp',
    '/ukchina/trad',
  ];
  shouldMatchValidRoutes(validRoutes, frontpageRegexPath);

  const invalidRoutes = [
    '/news/home',
    '/persian/c5jje4ejkqvo.amp',
    '/iplayer',
    '/serbian/foo',
  ];
  shouldNotMatchInvalidRoutes(invalidRoutes, frontpageRegexPath);
});

describe('frontpageDataRegexPath', () => {
  const validRoutes = ['/news.json', '/persian.json', '/serbian/lat.json'];
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
