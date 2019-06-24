import getEnv from './getEnv';

const tests = [
  {
    input: 'https://www.bbc.co.uk',
    expected: 'live',
    assertion: 'should return expected output for live',
  },
  {
    input: 'https://www.stage.bbc.co.uk',
    expected: 'stage',
    assertion: 'should return expected output for stage',
  },
  {
    input: 'https://www.test.bbc.co.uk',
    expected: 'test',
    assertion: 'should return expected output for test',
  },
  {
    input: 'http://localhost.bbc.com:7080',
    expected: 'local',
    assertion: 'should return expected output for local',
  },
  {
    input: 'https://www.foobar.com',
    expected: 'live',
    assertion:
      'should return expected output of live for unknown origins that dont specify env',
  },
  {
    input: 'https://www.test.foobar.com',
    expected: 'test',
    assertion:
      'should return expected output of test for unknown origins that specify env',
  },
];

tests.forEach(({ input, expected, assertion }) => {
  it(assertion, () => {
    expect(getEnv(input)).toEqual(expected);
  });
});
