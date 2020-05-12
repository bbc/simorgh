import fetch from 'node-fetch';

/* eslint-disable no-undef */
const fetchResponse = async link => {
  const fetchStatus = await fetch(link);
  return fetchStatus.status;
};

describe(`${service.default.service} navigation links`, () => {
  const { navigation } = service.default;
  navigation.map(nav => {
    const fullUrl = `https://www.bbc.com${nav.url}`;
    return it(`should return 200 for ${fullUrl}`, async () => {
      expect(await fetchResponse(fullUrl)).toEqual(200);
    });
  });
});

describe(`${service.default.service} footer links`, () => {
  const { footer } = service.default;
  const keys = Object.keys(footer);
  const hrefsArray = [];

  keys.forEach(key => {
    if (key !== 'links' && key !== 'copyrightText') {
      hrefsArray.push(footer[key].href);
    } else if (key === 'links') {
      footer.links.forEach(linkObj => {
        hrefsArray.push(linkObj.href);
      });
    }
  });

  hrefsArray.map(footerHref => {
    return it(`should return 200 for ${footerHref}`, async () => {
      expect(await fetchResponse(footerHref)).toEqual(200);
    });
  });
});
