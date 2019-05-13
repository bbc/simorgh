import { matchPath } from 'react-router-dom';
import { articleRegexPath } from './index';

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
