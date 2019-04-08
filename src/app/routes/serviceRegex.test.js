import serviceRegex from './serviceRegex';

describe('Service Regex', () => {
  const matchedServices = 'news|persian';

  test('It should return a string of supported services', () => {
    expect(serviceRegex).toEqual(matchedServices);
  });
});
