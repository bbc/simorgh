import { matchPath } from 'react-router-dom';
import {
  articleRegexPath,
  articleDataRegexPath,
  frontpageRegexPath,
  frontpageDataRegexPath,
  swRegexPath,
  manifestRegexPath,
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
  shouldMatchValidRoutes(validRoutes, swRegexPath);

  const invalidRoutes = ['/news/sw.js', '/persian/articles/sw'];
  shouldNotMatchInvalidRoutes(invalidRoutes, swRegexPath);
});

describe('manifestRegexPath', () => {
  const validRoutes = [
    '/news/articles/manifest.json',
    '/persian/articles/manifest.json',
  ];
  shouldMatchValidRoutes(validRoutes, manifestRegexPath);

  const invalidRoutes = ['/news/manifest.json', '/persian/articles/manifest'];
  shouldNotMatchInvalidRoutes(invalidRoutes, manifestRegexPath);
});
