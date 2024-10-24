/* eslint-disable no-undef */
const getServiceName = serviceConfig => {
  if (serviceConfig.default) {
    return service.default.service;
  }

  const variants = Object.keys(serviceConfig);
  return service[variants[0]].service;
};

const getLinks = (serviceConfig, type) => {
  if (serviceConfig.default) {
    return serviceConfig.default[type];
  }

  const variants = Object.keys(serviceConfig);
  const serviceConfigVariantOne = serviceConfig[variants[0]][type];
  const serviceConfigVariantTwo = serviceConfig[variants[1]][type];

  return type === 'navigation'
    ? serviceConfigVariantOne.concat(serviceConfigVariantTwo)
    : { ...serviceConfigVariantOne, ...serviceConfigVariantTwo };
};

const getAbsoluteUrl = link => {
  const regex = /^http(s)*:\/\//;
  return regex.test(link) ? link : `https://www.bbc.com${link}`;
};

const fetchResponse = async link => {
  const fetchStatus = await fetch(link, { timeout: 20000 });
  return fetchStatus.status;
};

describe(`${getServiceName(service)} navigation links`, () => {
  const navigation = getLinks(service, 'navigation');

  navigation.forEach(nav => {
    const url = getAbsoluteUrl(nav.url);

    it(`should return 200 for ${url}`, async () => {
      expect(await fetchResponse(url)).toEqual(200);
    });
  });
});

describe(`${getServiceName(service)} footer links`, () => {
  const footer = getLinks(service, 'footer');
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

  hrefsArray.forEach(footerHref => {
    const url = getAbsoluteUrl(footerHref);

    it(`should return 200 for ${url}`, async () => {
      expect(await fetchResponse(url)).toEqual(200);
    });
  });
});
