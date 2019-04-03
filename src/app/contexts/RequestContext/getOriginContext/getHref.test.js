import {
  setLocationValue,
  resetLocationValue,
} from '../../../helpers/tests/setLocationValue';

import getHref from './getHref';

const functionInput = {
  origin: 'https://foobar.com',
  service: 'news',
  optimoId: '1234',
};

const tests = [
  {
    input: functionInput,
    windowHref: 'https://foobar.com/foo/bar',
    expected: 'https://foobar.com/foo/bar',
    assertion: 'should use windowHref if availible',
  },
  {
    input: functionInput,
    windowHref: null,
    expected: 'https://foobar.com/news/articles/1234',
    assertion: 'should constuct href if not availible',
  },
  {
    input: {},
    windowHref: null,
    expected: null,
    assertion:
      'should return null if href not availible and all inputs are null',
  },
  {
    input: { origin: 'https://foobar.com' },
    windowHref: null,
    expected: null,
    assertion:
      'should return null if href not availible and some inputs are null',
  },
];

const windowLocation = window.location;

describe('getOrigin', () => {
  afterEach(() => {
    resetLocationValue(windowLocation);
  });

  tests.forEach(({ input, windowHref, expected, assertion }) => {
    it(assertion, () => {
      setLocationValue({
        href: windowHref,
      });

      const { origin, service, optimoId } = input;

      expect(getHref(origin, service, optimoId)).toEqual(expected);
    });
  });
});
