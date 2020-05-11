import fetch from 'node-fetch';
/* eslint-disable no-undef */

const fetchResponse = async link => {
  const fetchStatus = await fetch(link);
  return fetchStatus.status;
};

describe(`${service.default.service} links`, () => {
  const { navigation } = service.default;
  navigation.map(nav => {
    const fullUrl = `https://www.bbc.com${nav.url}`;
    return it(`should return 200 for ${fullUrl}`, async () => {
      expect(await fetchResponse(fullUrl)).toEqual(200);
    });
  });
});
