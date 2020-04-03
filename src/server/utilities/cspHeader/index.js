import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

const directives = {
  connectSrc: {
    ampLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://toggles.api.bbci.co.uk', // Toggles service
      'https://cdn.ampproject.org', // AMP
      'https://amp-error-reporting.appspot.com', // AMP
      "'self'",
    ],
    canonicalLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://toggles.api.bbci.co.uk', // Toggles service
      'https://cookie-oven.api.bbc.com', // Cookie banner
      'https://cookie-oven.api.bbc.co.uk', // Cookie banner
      "'self'",
    ],
    ampNonLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://cdn.ampproject.org',
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://toggles.test.api.bbci.co.uk',
      "'self'",
    ],
    canonicalNonLive: [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://logws1363.ati-host.net', // ATI
      'https://toggles.test.api.bbci.co.uk', // Toggles service
      'https://cookie-oven.api.bbc.com', // Cookie banner
      'https://cookie-oven.api.bbc.co.uk', // Cookie banner
      'https://cookie-oven.test.api.bbc.com', // Cookie banner
      'https://cookie-oven.test.api.bbc.co.uk', // Cookie banner
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      "'self'",
    ],
    canonicalLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      "'self'",
    ],
    ampNonLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://polling.test.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      "'self'",
    ],
    canonicalNonLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://polling.test.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      "'self'",
    ],
  },
  imgSrc: {
    ampLive: [
      // not currently used since is identical to canonical
    ],
    canonicalLive: [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      "data: 'self'", // needed at the end to maintain proper order
    ],
    ampNonLive: [
      // not currently used since is identical to canonical
    ],
    canonicalNonLive: [
      'https://ichef.bbci.co.uk', // Images
      'https://ichef.test.bbci.co.uk', // Images
      'https://ping.chartbeat.net', // Chartbeat
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI analytics
      'https://logws1363.ati-host.net', // ATI analytics
      'https://news.files.bbci.co.uk', // Static Assets
      'https://news.test.files.bbci.co.uk', // Static Assets
      'https://*.akstat.io', //
      'https://r.bbci.co.uk', //
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      "data: 'self'", // needed at the end to maintain proper order
    ],
  },
  scriptSrc: {
    ampLive: [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalLive: [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      'https://news.files.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
      "'self'",
      "'unsafe-inline'",
    ],
  },
};

export const generateChildSrc = ({ isAmp }) => (isAmp ? ['blob:'] : ["'self'"]);

export const generateConnectSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.connectSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.connectSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.connectSrc.ampLive;
  return directives.connectSrc.canonicalLive;
};

export const generateDefaultSrc = () => ["'self'"];

export const generateFontSrc = () => [
  'https://gel.files.bbci.co.uk',
  'https://ws-downloads.files.bbci.co.uk',
];

export const generateFrameSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.frameSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.frameSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.frameSrc.ampLive;
  return directives.frameSrc.canonicalLive;
};

// img-src currently doesn't vary between Amp and Canonical
export const generateImgSrc = ({ isLive }) => {
  if (!isLive) return directives.imgSrc.canonicalNonLive;
  return directives.imgSrc.canonicalLive;
};

export const generateScriptSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.scriptSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.scriptSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.scriptSrc.ampLive;
  return directives.scriptSrc.canonicalLive;
};

export const generateStyleSrc = () => ["'unsafe-inline'"];

export const generateWorkerSrc = ({ isAmp }) =>
  isAmp ? ['blob:'] : ["'self'"];

const helmetCsp = ({ isAmp, isLive }) => ({
  directives: {
    'default-src': generateDefaultSrc(),
    'child-src': generateChildSrc({ isAmp }),
    'connect-src': generateConnectSrc({ isAmp, isLive }),
    'font-src': generateFontSrc(),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'img-src': generateImgSrc({ isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'style-src': generateStyleSrc(),
    'worker-src': generateWorkerSrc({ isAmp }),
  },
});

const injectCspHeader = (req, res, next) => {
  const { isAmp } = getRouteProps(routes, req.url);
  const originHeader = req.headers['bbc-origin'];
  const { origin } = getOriginContext(originHeader);

  const isLive =
    origin === 'https://www.bbc.co.uk' || origin === 'https://www.bbc.com';

  const middleware = csp(helmetCsp({ isAmp, isLive }));
  middleware(req, res, next);
};

export default injectCspHeader;
