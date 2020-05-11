import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

/* Guidelines to follow when updating the CSP Header can be found here:
https://github.com/bbc/simorgh-infrastructure/blob/latest/documentation/updating-csp.md */

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
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com', // AMP
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
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
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.test.files.bbci.co.uk', // STY include
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
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://toggles.test.api.bbci.co.uk',
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
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
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.test.files.bbci.co.uk', // STY include
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
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
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      "'self'",
    ],
    ampNonLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://polling.test.bbc.co.uk', // Media page
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
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
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      "'self'",
    ],
  },
  imgSrc: {
    ampLive: [
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
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      "data: 'self'",
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
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      "data: 'self'", // needed at the end to maintain proper order
    ],
    ampNonLive: [
      'https://ichef.bbci.co.uk', // Images
      'https://ichef.test.bbci.co.uk', // Images
      'https://ping.chartbeat.net', // Chartbeat
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI analytics
      'https://logws1363.ati-host.net', // ATI analytics
      'https://news.files.bbci.co.uk', // Static Assets
      'https://news.test.files.bbci.co.uk', // Static Assets
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      "data: 'self'",
    ],
    canonicalNonLive: [
      'https://ichef.bbci.co.uk', // Images
      'https://ichef.test.bbci.co.uk', // Images
      'https://ping.chartbeat.net', // Chartbeat
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI analytics
      'https://logws1363.ati-host.net', // ATI analytics
      'https://news.files.bbci.co.uk', // Static Assets
      'https://news.test.files.bbci.co.uk', // Static Assets
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://via.placeholder.com', // ads
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      "data: 'self'", // needed at the end to maintain proper order
    ],
  },
  scriptSrc: {
    ampLive: [
      'https://news.files.bbci.co.uk', // STY include
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
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
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'http://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'http://static.stage.bbc.co.uk',
      'https://static.bbc.co.uk',
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
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
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'http://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'http://static.stage.bbc.co.uk', // STY include
      'https://static.bbc.co.uk', // STY include
      "'self'",
      "'unsafe-inline'",
    ],
  },
  styleSrc: {
    ampLive: [
      'https://news.files.bbci.co.uk', // STY include styles
      "'unsafe-inline'",
    ],
    canonicalLive: [
      'https://news.files.bbci.co.uk', // STY include styles
      'https://platform.twitter.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      'https://news.test.files.bbci.co.uk', // STY includes
      'http://static.stage.bbc.co.uk', // STY include
      "'unsafe-inline'",
    ],
    ampNonLive: [
      'https://news.files.bbci.co.uk', // STY include styles
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      'https://news.files.bbci.co.uk', // STY include styles
      'https://platform.twitter.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      'https://news.test.files.bbci.co.uk', // STY includes
      'http://static.stage.bbc.co.uk', // STY include
      "'unsafe-inline'",
    ],
  },
  fontSrc: {
    amp: [
      'https://gel.files.bbci.co.uk',
      'https://ws-downloads.files.bbci.co.uk',
    ],
    canonical: [
      'https://gel.files.bbci.co.uk',
      'https://ws-downloads.files.bbci.co.uk',
      'https://static.bbci.co.uk', // STY includes
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

export const generateFontSrc = ({ isAmp }) =>
  isAmp ? directives.fontSrc.amp : directives.fontSrc.canonical;

export const generateFrameSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.frameSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.frameSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.frameSrc.ampLive;
  return directives.frameSrc.canonicalLive;
};

export const generateImgSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.imgSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.imgSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.imgSrc.ampLive;
  return directives.imgSrc.canonicalLive;
};

export const generateScriptSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.scriptSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.scriptSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.scriptSrc.ampLive;
  return directives.scriptSrc.canonicalLive;
};

export const generateStyleSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.styleSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.styleSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.styleSrc.ampLive;
  return directives.styleSrc.canonicalLive;
};

export const generateWorkerSrc = ({ isAmp }) =>
  isAmp ? ['blob:'] : ["'self'"];

const helmetCsp = ({ isAmp, isLive }) => ({
  directives: {
    'default-src': generateDefaultSrc(),
    'child-src': generateChildSrc({ isAmp }),
    'connect-src': generateConnectSrc({ isAmp, isLive }),
    'font-src': generateFontSrc({ isAmp }),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'img-src': generateImgSrc({ isAmp, isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'style-src': generateStyleSrc({ isAmp, isLive }),
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
