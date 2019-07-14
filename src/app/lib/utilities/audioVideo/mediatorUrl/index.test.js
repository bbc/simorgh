import mediatorURL from '.';

describe('mediatorURL', () => {
  const tests = [
    {
      env: 'local',
      expected: 'open.test.bbc.co.uk',
      description: 'local env returns test url',
    },
    {
      env: 'test',
      expected: 'open.test.bbc.co.uk',
      description: 'test env returns test url',
    },
    {
      env: 'live',
      expected: 'open.bbc.co.uk',
      description: 'live env returns live url',
    },
    {
      env: '',
      expected: 'open.bbc.co.uk',
      description: 'no env returns live url',
    },
  ];

  tests.forEach(({ env, expected, description }) => {
    it(description, () => {
      expect(mediatorURL(env)).toEqual(expected);
    });
  });
});
