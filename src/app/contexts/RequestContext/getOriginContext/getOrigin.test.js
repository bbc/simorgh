import {
  setLocationValue,
  resetLocationValue,
} from '../../../helpers/tests/setLocationValue';

import getOrigin from './getOrigin';

const tests = [
  {
    bbcOrigin: 'https://www.bbc.com',
    windowOrigin: 'https://foobar.com',
    expected: 'https://www.bbc.com',
    assertion: 'should use bbcOrigin if provided',
  },
  {
    bbcOrigin: null,
    windowOrigin: 'https://foobar.com',
    expected: 'https://foobar.com',
    assertion: 'should use windowOrigin if it is provided and bbcOrigin isnt',
  },
  {
    bbcOrigin: null,
    windowOrigin: null,
    expected: 'https://www.bbc.co.uk',
    assertion: 'should use default is bbcOrigin and windowOrigin arnt set',
  },
];

const windowLocation = window.location;

describe('getOrigin', () => {
  afterEach(() => {
    resetLocationValue(windowLocation);
  });

  tests.forEach(({ bbcOrigin, windowOrigin, expected, assertion }) => {
    it(assertion, () => {
      setLocationValue({
        origin: windowOrigin,
      });

      expect(getOrigin(bbcOrigin)).toEqual(expected);
    });
  });
});
