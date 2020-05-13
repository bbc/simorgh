import fetch from 'node-fetch';

/* eslint-disable no-undef */
const getServiceName = serviceConfig => {
  if (serviceConfig.length === 1) {
    return service.default.service;
  }

  const variants = Object.keys(serviceConfig);
  return service[variants[0]].service;
};

const getLinks = (serviceConfig, type) => {
  if (serviceConfig.length === 1) {
    return serviceConfig.default;
  }

  const variants = Object.keys(serviceConfig);
  const serviceConfigVariantOne = serviceConfig[variants[0]][type];
  const serviceConfigVariantTwo = serviceConfig[variants[1]][type];

  return type === 'navigation'
    ? serviceConfigVariantOne.concat(serviceConfigVariantTwo)
    : { ...serviceConfigVariantOne, ...serviceConfigVariantTwo };
};

const fetchResponse = async link => {
  const fetchStatus = await fetch(link);
  return fetchStatus.status;
};

describe(`${getServiceName(service)} navigation links`, () => {
  const navigation = getLinks(service, 'navigation');

  navigation.map(nav => {
    const fullUrl = `https://www.bbc.com${nav.url}`;
    return it(`should return 200 for ${fullUrl}`, async () => {
      expect(await fetchResponse(fullUrl)).toEqual(200);
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

  hrefsArray.map(footerHref => {
    return it(`should return 200 for ${footerHref}`, async () => {
      expect(await fetchResponse(footerHref)).toEqual(200);
    });
  });
});
