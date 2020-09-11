import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

/*
 * On localhost these CSP headers currently only apply on the production build.
 * `npm run build && npm run start` & visit a localhost URL.
 * View the developer console for errors.
 */

const advertisingDirectives = {
  connectSrc: [
    'https://csi.gstatic.com',
    'https://experience.tinypass.com',
    'https://pagead2.googlesyndication.com',
    'https://*.g.doubleclick.net',
    'https://static.test.files.bbci.co.uk',
    'https://static.files.bbci.co.uk',
    'https://survey.effectivemeasure.net',
    'https://collector.effectivemeasure.net',
    'https://detect-survey.effectivemeasure.net',
    'https://www.live.bbc.co.uk',
    'https://adservice.google.com',
    'https://tpc.googlesyndication.com',
  ],
  frameSrc: [
    'https://*.g.doubleclick.net',
    'https://tpc.googlesyndication.com',
    'https://bcp.crwdcntrl.net',
    'https://edigitalsurvey.com',
    'https://*.safeframe.googlesyndication.com',
  ],
  imgSrc: [
    'https://collector.effectivemeasure.net',
    'https://csi.gstatic.com',
    'https://pagead2.googlesyndication.com',
    'https://sb.scorecardresearch.com',
    'https://secure-us.imrworldwide.com',
    'https://*.g.doubleclick.net',
    'https://tpc.googlesyndication.com',
    'https://*.google.com',
  ],
  scriptSrc: [
    'https://ad.crwdcntrl.net',
    'https://adservice.google.co.uk',
    'https://adservice.google.com',
    'https://bbc.gscontxt.net',
    'https://bcp.crwdcntrl.net',
    'https://cdn.ampproject.org',
    'https://collector.effectivemeasure.net',
    'https://me-ssl.effectivemeasure.net',
    'https://pixel.adsafeprotected.com',
    'https://privacy.crwdcntrl.net',
    'https://sb.scorecardresearch.com',
    'https://static.adsafeprotected.com',
    'https://*.g.doubleclick.net',
    'https://t.effectivemeasure.net',
    'https://tags.crwdcntrl.net',
    'https://tpc.googlesyndication.com',
    'https://gn-web-assets.api.bbc.com',
    'https://www.googletagservices.com',
  ],
  defaultSrc: [
    'https://tpc.googlesyndication.com',
    'https://*.safeframe.googlesyndication.com',
  ],
};

const directives = {
  connectSrc: {
    ampLive: [
      'https://*.akamaihd.net',
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://config.api.bbci.co.uk', // Toggles service
      'https://cdn.ampproject.org', // AMP
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com', // AMP
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      'https://mybbc-analytics.files.bbci.co.uk',
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalLive: [
      'https://*.akamaihd.net',
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://config.api.bbci.co.uk', // Toggles service
      'https://cookie-oven.api.bbc.com', // Cookie banner
      'https://cookie-oven.api.bbc.co.uk', // Cookie banner
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.files.bbci.co.uk', // STY include
      'https://mybbc-analytics.files.bbci.co.uk',
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    ampNonLive: [
      'https://*.akamaihd.net',
      'https://cdn.ampproject.org',
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://config.test.api.bbci.co.uk',
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      'https://mybbc-analytics.files.bbci.co.uk',
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalNonLive: [
      'https://*.akamaihd.net',
      'https://logws1363.ati-host.net', // ATI
      'https://config.test.api.bbci.co.uk', // Toggles service
      'https://cookie-oven.api.bbc.com', // Cookie banner
      'https://cookie-oven.api.bbc.co.uk', // Cookie banner
      'https://cookie-oven.test.api.bbc.com', // Cookie banner
      'https://cookie-oven.test.api.bbc.co.uk', // Cookie banner
      'https://www.bbc.com', // ads
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      'https://mybbc-analytics.files.bbci.co.uk',
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      'https://polling.bbc.co.uk', // Media Player
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
      'https://news.files.bbci.co.uk', // STY include
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    canonicalLive: [
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      'https://news.files.bbci.co.uk', // STY include
      'https://www.bbc.co.uk', // STY include
      'https://bbc.com', // Media Player
      'https://www.bbc.com', // Media Player
      'https://bbc-maps.carto.com', // STY include maps
      'https://flo.uri.sh', // STY includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    ampNonLive: [
      'https://polling.bbc.co.uk', // Media Player
      'https://polling.test.bbc.co.uk', // Media Player
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    canonicalNonLive: [
      'https://emp.bbc.com',
      'https://emp.bbc.co.uk',
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      'https://news.files.bbci.co.uk', // STY include
      'https://www.bbc.co.uk', // STY include
      'http://www.bbc.co.uk', // for localhost STY include
      'https://test.bbc.com', // Media Player
      'https://www.bbc.com', // Media Player
      'https://bbc.com', // Media Player
      'https://bbc-maps.carto.com', // STY include maps
      'https://news.test.files.bbci.co.uk',
      'https://flo.uri.sh', // STY includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
  },
  imgSrc: {
    ampLive: [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://r.bbci.co.uk',
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      ...advertisingDirectives.imgSrc,
      "data: 'self'",
    ],
    canonicalLive: [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://r.bbci.co.uk',
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      'https://news.bbcimg.co.uk', // STY include
      'https://static.bbc.co.uk', // STY include
      ...advertisingDirectives.imgSrc,
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
      'https://r.bbci.co.uk',
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      ...advertisingDirectives.imgSrc,
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
      'https://r.bbci.co.uk',
      'http://b.files.bbci.co.uk', // localhost http connection for image
      'http://ping.chartbeat.net', // localhost prod build
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      'https://news.bbcimg.co.uk', // STY include
      'https://static.bbc.co.uk', // STY include
      'http://static.bbc.co.uk', // localhost STY include
      ...advertisingDirectives.imgSrc,
      "data: 'self'", // needed at the end to maintain proper order
    ],
  },
  scriptSrc: {
    ampLive: [
      'https://news.files.bbci.co.uk', // STY include
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalLive: [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://static.bbc.co.uk', // STY include
      'https://www.bbc.co.uk', // STY include
      'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - int
      'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - test
      'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - live
      'https://public.flourish.studio', // STY includes
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      'https://news.files.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://static.bbc.co.uk', // STY include
      'http://static.bbc.co.uk', // for localhost STY include
      'https://www.bbc.co.uk', // STY include
      'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - int
      'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - test
      'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - live
      'https://public.flourish.studio', // STY includes
      ...advertisingDirectives.scriptSrc,
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
      'https://news.files.bbci.co.uk', // STY includes
      'https://static.bbc.co.uk', // STY include
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
      'https://news.files.bbci.co.uk', // STY includes
      'https://news.test.files.bbci.co.uk', // STY includes
      'https://static.bbc.co.uk', // STY include
      'http://static.bbc.co.uk', // STY include
      "'unsafe-inline'",
    ],
  },
  fontSrc: {
    amp: [
      'https://gel.files.bbci.co.uk', // Reith fonts
      'https://ws-downloads.files.bbci.co.uk', // Other WS fonts
    ],
    canonical: [
      'https://gel.files.bbci.co.uk', // Reith fonts
      'https://ws-downloads.files.bbci.co.uk', // Other WS fonts
      'https://static.bbci.co.uk', // STY includes
    ],
  },
  mediaSrc: {
    ampLive: [
      'https://news.files.bbci.co.uk', // VJ includes may load .mp3 files
    ],
    canonicalLive: [
      'https://news.files.bbci.co.uk', // VJ includes may load .mp3 files
    ],
    ampNonLive: [
      'https://news.files.bbci.co.uk', // VJ includes may load .mp3 files
      'https://news.test.files.bbci.co.uk', // Test
    ],
    canonicalNonLive: [
      'https://news.files.bbci.co.uk', // VJ includes may load .mp3 files
      'https://news.test.files.bbci.co.uk', // Test
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

export const generateDefaultSrc = () => {
  return [...advertisingDirectives.defaultSrc, "'self'"];
};

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

export const generateMediaSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.mediaSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.mediaSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.mediaSrc.ampLive;
  return directives.mediaSrc.canonicalLive;
};

export const generateWorkerSrc = ({ isAmp }) =>
  isAmp ? ['blob:'] : ["'self'"];

const helmetCsp = ({ isAmp, isLive }) => ({
  directives: {
    'default-src': generateDefaultSrc({ isAmp, isLive }),
    'child-src': generateChildSrc({ isAmp }),
    'connect-src': generateConnectSrc({ isAmp, isLive }),
    'font-src': generateFontSrc({ isAmp }),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'img-src': generateImgSrc({ isAmp, isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'style-src': generateStyleSrc({ isAmp, isLive }),
    'media-src': generateMediaSrc({ isAmp, isLive }),
    'worker-src': generateWorkerSrc({ isAmp }),
    'report-to': 'default',
    'upgrade-insecure-requests': true,
  },
  browserSniff: false,
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
