import csp from 'helmet-csp';
import getRouteProps from '#app/routes/getInitialData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

// Test AMP Connect Tag
// connect-src https://logws1363.ati-host.net https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com

// Live AMP Script Tag
// connect-src https://a1.api.bbc.co.uk/hit.xiti https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com

export const generateScriptSrc = (isAmp, isLive) => {
  if (isAmp) {
    return [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'unsafe-inline'",
    ];
  }

  const scriptSrc = [
    'https://news.files.bbci.co.uk',
    'https://*.chartbeat.com',
    'https://*.go-mpulse.net',
    'https://mybbc-analytics.files.bbci.co.uk',
    'https://emp.bbci.co.uk',
    'https://static.bbci.co.uk',
    "'self'",
    "'unsafe-inline'",
  ];

  if (!isLive) {
    scriptSrc.push('https://news.test.files.bbci.co.uk');
  }

  return scriptSrc;
};

export const generateImgSrc = isLive => {
  const imgSrc = [
    'https://ichef.bbci.co.uk',
    'https://ping.chartbeat.net',
    'https://a1.api.bbc.co.uk/hit.xiti',
    'https://news.files.bbci.co.uk',
    'https://*.akstat.io',
    'https://r.bbci.co.uk',
  ];

  if (!isLive) {
    const testSrc = [
      'https://ichef.test.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://logws1363.ati-host.net',
      "data: 'self'",
    ];
    return imgSrc.concat(testSrc);
  }
  // Duplicated to maintain proper order
  imgSrc.push("data: 'self'");
  return imgSrc;
};

const cookieOvenTld = isUK => {
  if (!isUK) {
    return '.com';
  }
  return '.co.uk';
};

const generateCookieOvenUrls = (isUk, isLive) => {
  const cookieUrl = [`https://cookie-oven.api.bbc${cookieOvenTld(isUk)}`];
  if (!isLive) {
    cookieUrl.push(`https://cookie-oven.test.api.bbc${cookieOvenTld(isUk)}`);
  }

  return cookieUrl;
};

export const generateConnectSrc = (isAmp, isUK, isLive) => {
  const connectSrc = [
    'https://*.akstat.io',
    'https://*.akamaihd.net',
    'https://c.go-mpulse.net',
  ];

  if (!isLive) {
    connectSrc.push('https://logws1363.ati-host.net');
  } else {
    connectSrc.push('https://a1.api.bbc.co.uk/hit.xiti');
  }

  if (isAmp) {
    return connectSrc;
  }

  connectSrc.push("'self'");

  return connectSrc.concat(generateCookieOvenUrls(isUK, isLive));
};

const constructCspHeader = (isAmp, isUK, isLive) => ({
  directives: {
    'default-src': ["'self'"],
    'font-src': [
      'https://gel.files.bbci.co.uk',
      'https://ws-downloads.files.bbci.co.uk',
    ],
    'style-src': ["'unsafe-inline'"],
    'img-src': generateImgSrc(isLive),
    'script-src': generateScriptSrc(isAmp, isLive),
    'connect-src': generateConnectSrc(isAmp, isUK, isLive),
    'frame-src': [
      "'self'",
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
    ],
  },
});

export const localInjectHostCspHeader = (_req, _res, next) => {
  next();
};

const injectCspHeader = (req, res, next) => {
  const { isAmp } = getRouteProps(routes, req.url);
  const originHeader = req.headers['bbc-origin'];
  const { origin, isUK } = getOriginContext(originHeader);

  const isLive = origin === 'https://bbc.co.uk' || origin === 'https://bbc.com';

  const middleware = csp(constructCspHeader(isAmp, isUK, isLive));
  middleware(req, res, next);
};

export default injectCspHeader;
