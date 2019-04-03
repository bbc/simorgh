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
    expected: 'https://foobar.com/news/1234',
    assertion: 'should constuct href if not availible',
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
