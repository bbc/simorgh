import { matchPath } from 'react-router-dom';
import {
  articleRegexPath,
  articleDataRegexPath,
  frontpageRegexPath,
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

describe('articleRegexPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/news/articles/c5jje4ejkqvo.amp',
    '/persian/articles/c7eel0lmr4do',
    '/news/articles/c7eel0lmr4do.amp',
  ];

  it.each(validRoutes)('should match valid route %s', route => {
    expect(matchRoute(route, articleRegexPath)).toBe(true);
  });

  const invalidRoutes = [
    '/iplayer/articles/c5jje4ejkqvo',
    '/news/article/c5jje4ejkqvo.amp',
    '/persian/c7eel0lmr4do',
    '/news/articles/c12o',
    '/news/articles/c5jje4ejkqv',
    '/news/articles/',
  ];

  it.each(invalidRoutes)('should not match invalid route %s', route => {
    expect(matchRoute(route, articleRegexPath)).toBe(false);
  });
});

describe('articleDataRegexPath', () => {
  const validRoutes = [
    '/news/articles/c5jje4ejkqvo.json',
    '/persian/articles/c7eel0lmr4do.json',
  ];

  it.each(validRoutes)('should match valid route %s', route => {
    expect(matchRoute(route, articleDataRegexPath)).toBe(true);
  });

  const invalidRoutes = [
    '/news/articles/c5jje4ejkqvo',
    '/persian/articles/c7eel0lmr4do',
    '/iplayer/articles/c7eel0lmr4do.json',
  ];

  it.each(invalidRoutes)('should not match invalid route %s', route => {
    expect(matchRoute(route, articleDataRegexPath)).toBe(false);
  });
});

describe('frontpageRegexPath', () => {
  const validRoutes = ['/news', '/persian', '/news.amp', '/persian.amp'];

  it.each(validRoutes)('should match valid route %s', route => {
    expect(matchRoute(route, frontpageRegexPath)).toBe(true);
  });

  const invalidRoutes = ['/news/home', '/persian/c5jje4ejkqvo.amp', '/iplayer'];

  it.each(invalidRoutes)('should not match invalid route %s', route => {
    expect(matchRoute(route, frontpageRegexPath)).toBe(false);
  });
});
