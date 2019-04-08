import serviceRegex from './serviceRegex';

describe('Service Regex', () => {
  const matchedServices = 'news|persian';

  test('It should return an string of supported services', () => {
    expect(serviceRegex).toEqual(matchedServices);
  });
});
