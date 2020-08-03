import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import routes from '#app/routes';
import getOriginContext from '#contexts/RequestContext/getOriginContext';

/*
 * On localhost these CSP headers currently only apply on the production build.
 * `npm run build && npm run start` & visit a localhost URL.
 * View the developer console for errors.
 */

const directives = {
  connectSrc: {
    ampLive: [
      'https://*.akamaihd.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://config.api.bbci.co.uk', // Toggles service
      'https://cdn.ampproject.org', // AMP
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com', // AMP
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      'https://mybbc-analytics.files.bbci.co.uk',
      "'self'",
    ],
    canonicalLive: [
      'https://*.akamaihd.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://a1.api.bbc.co.uk/hit.xiti', // ATI
      'https://config.api.bbci.co.uk', // Toggles service
      'https://cookie-oven.api.bbc.com', // Cookie banner
      'https://cookie-oven.api.bbc.co.uk', // Cookie banner
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.files.bbci.co.uk', // STY include
      'https://mybbc-analytics.files.bbci.co.uk',
      "'self'",
    ],
    ampNonLive: [
      'https://*.akamaihd.net',
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://cdn.ampproject.org',
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://config.test.api.bbci.co.uk',
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      'https://mybbc-analytics.files.bbci.co.uk',
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
      'https://www.bbc.co.uk', // STY include indepthtoolkit
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      'https://csi.gstatic.com', // ads
      'https://experience.tinypass.com', // ads
      'https://static.test.files.bbci.co.uk', // ads
      'https://survey.effectivemeasure.net', // ads
      'https://detect-survey.effectivemeasure.net', // ads
      'https://collector.effectivemeasure.net', // ads
      'https://adservice.google.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://pagead2.googlesyndication.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://mybbc-analytics.files.bbci.co.uk',
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
      'https://news.files.bbci.co.uk', // STY include
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
      'https://news.files.bbci.co.uk', // STY include
      'https://www.bbc.co.uk', // STY include
      'https://bbc-maps.carto.com', // STY include maps
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
      'https://news.files.bbci.co.uk', // STY include
      'https://news.test.files.bbci.co.uk', // STY include
      "'self'",
    ],
    canonicalNonLive: [
      'https://polling.bbc.co.uk', // Media page
      'https://polling.test.bbc.co.uk', // Media page
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
      'https://bbc-maps.carto.com', // STY include maps
      'https://bcp.crwdcntrl.net', // ads
      'https://edigitalsurvey.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://news.test.files.bbci.co.uk',
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
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://sb.scorecardresearch.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
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
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      'https://news.bbcimg.co.uk', // STY include
      'https://static.bbc.co.uk', // STY include
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
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://sb.scorecardresearch.com', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
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
      'https://r.bbci.co.uk',
      'https://pagead2.googlesyndication.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://www.google.com', // ads
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
      'https://collector.effectivemeasure.net', // ads
      'https://csi.gstatic.com', // ads
      'https://sb.scorecardresearch.com', // ads
      'https://secure-us.imrworldwide.com', // ads
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
      'http://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://static.bbc.co.uk', // STY include
      'https://www.bbc.co.uk', // STY include
      'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - int
      'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - test
      'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - live
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
      'http://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://static.bbc.co.uk', // STY include
      'http://static.bbc.co.uk', // for localhost STY include
      'https://www.bbc.co.uk', // STY include
      'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - int
      'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - test
      'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js', // Passport bookmarklet - live
      'https://ad.crwdcntrl.net', // ads
      'https://adservice.google.co.uk', // ads
      'https://adservice.google.com', // ads
      'https://bbc.gscontxt.net', // ads
      'https://bcp.crwdcntrl.net', // ads
      'https://cdn.ampproject.org', // ads
      'https://collector.effectivemeasure.net', // ads
      'https://me-ssl.effectivemeasure.net', // ads
      'https://privacy.crwdcntrl.net', // ads
      'https://sb.scorecardresearch.com', // ads
      'https://securepubads.g.doubleclick.net', // ads
      'https://t.effectivemeasure.net', // ads
      'https://tags.crwdcntrl.net', // ads
      'https://tpc.googlesyndication.com', // ads
      'https://gn-web-assets.api.bbc.com', // ads
      'https://www.googletagservices.com', // ads
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
  defaultSrc: {
    canonicalNonLive: [
      'https://*.safeframe.googlesyndication.com',
      'https://tpc.googlesyndication.com',
      "'self'",
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

export const generateDefaultSrc = ({ isAmp, isLive }) => {
  if (!isLive && !isAmp) return directives.defaultSrc.canonicalNonLive;
  return ["'self'"];
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
