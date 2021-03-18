import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import getOriginContext from '#contexts/RequestContext/getOriginContext';
import { bbcDomains, advertisingServiceCountryDomains } from './domainLists';

/*
 * On localhost these CSP headers currently only apply on the production build.
 * `yarn build && yarn start` & visit a localhost URL.
 * View the developer console for errors.
 */

const advertisingDirectives = {
  connectSrc: [
    'https://csi.gstatic.com',
    'https://*.googlesyndication.com',
    'https://*.doubleclick.net',
    'https://*.effectivemeasure.net',
    'https://adservice.google.com',
    'fundingchoicesmessages.google.com',
    'secure-dcr-cert.imrworldwide.com',
    'pixel.adsafeprotected.com',
  ],
  frameSrc: [
    'https://*.doubleclick.net',
    'https://*.googlesyndication.com',
    'https://edigitalsurvey.com',
    'cdn-gl.imrworldwide.com',
  ],
  imgSrc: [
    'https://*.doubleclick.net',
    'https://*.googlesyndication.com',
    'https://*.google.com',
    'https://*.adsafeprotected.com',
    'https://*.imrworldwide.com',
    'https://collector.effectivemeasure.net',
    'https://csi.gstatic.com',
    'https://sb.scorecardresearch.com',
    'https://www.gstatic.com',
  ],
  scriptSrc: [
    'https://adservice.google.co.uk',
    'https://adservice.google.com',
    'https://*.g.doubleclick.net',
    'https://cdn.ampproject.org',
    'https://*.effectivemeasure.net',
    'https://*.adsafeprotected.com',
    'https://sb.scorecardresearch.com',
    'https://tpc.googlesyndication.com',
    'https://www.googletagservices.com',
    'https://bbc.gscontxt.net',
    ...advertisingServiceCountryDomains,
  ],
  prefetchSrc: ['https://*.safeframe.googlesyndication.com'],
  defaultSrc: [
    ...bbcDomains,
    'https://tpc.googlesyndication.com',
    'https://*.safeframe.googlesyndication.com',
  ],
};

const directives = {
  connectSrc: {
    ampLive: [
      ...bbcDomains,
      'https://*.akamaihd.net',
      'https://cdn.ampproject.org', // AMP
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com', // AMP
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://*.akamaihd.net',
      'https://europe-west1-bbc-otg-traf-mgr-bq-prod-4591.cloudfunctions.net', // Web-Vitals monitoring
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://*.akamaihd.net',
      'https://cdn.ampproject.org',
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com',
      'https://logws1363.ati-host.net',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://*.akamaihd.net',
      'https://logws1363.ati-host.net', // ATI
      'https://europe-west1-bbc-otg-traf-mgr-bq-dev-4105.cloudfunctions.net', // Web-Vitals monitoring
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      ...bbcDomains,
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
      'https://www.riddle.com', // STY Includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      'https://bbc.com', // Media Player
      'https://bbc-maps.carto.com', // STY include maps
      'https://flo.uri.sh', // STY includes
      'https://www.riddle.com', // STY Includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.ampproject.net', // Social Embeds
      'https://www.riddle.com', // STY Includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://chartbeat.com',
      'https://*.chartbeat.com',
      'https://www.youtube.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://syndication.twitter.com', // Social Embeds
      'https://bbc.com', // Media Player
      'https://bbc-maps.carto.com', // STY include maps
      'https://flo.uri.sh', // STY includes
      'https://www.riddle.com', // STY Includes
      ...advertisingDirectives.frameSrc,
      "'self'",
    ],
  },
  imgSrc: {
    ampLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net',
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net',
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'", // needed at the end to maintain proper order
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net', // Chartbeat
      'https://logws1363.ati-host.net', // ATI analytics
      'http://ping.chartbeat.net', // localhost prod build
      'https://i.ytimg.com', // Social Embeds, <amp-youtube />
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://*.cdninstagram.com', // Social Embeds, <amp-instagram />
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net', // Chartbeat
      'https://logws1363.ati-host.net', // ATI analytics
      'http://ping.chartbeat.net', // localhost prod build
      'https://syndication.twitter.com', // Social Embeds
      'https://platform.twitter.com', // Social Embeds
      'https://pbs.twimg.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'", // needed at the end to maintain proper order
    ],
  },
  scriptSrc: {
    ampLive: [
      ...bbcDomains,
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://*.chartbeat.com',
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://public.flourish.studio', // STY includes
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://platform.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://*.chartbeat.com',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
      'https://platform.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://cdn.syndication.twimg.com', // Social Embeds
      'https://public.flourish.studio', // STY includes
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
  },
  styleSrc: {
    ampLive: [...bbcDomains, "'unsafe-inline'"],
    canonicalLive: [
      ...bbcDomains,
      'https://platform.twitter.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      "'unsafe-inline'",
    ],
    ampNonLive: [...bbcDomains, "'unsafe-inline'"],
    canonicalNonLive: [
      ...bbcDomains,
      'https://platform.twitter.com', // Social Embeds
      'https://ton.twimg.com', // Social Embeds
      "'unsafe-inline'",
    ],
  },
  fontSrc: {
    ampLive: [...bbcDomains],
    canonicalLive: [
      ...bbcDomains,
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/fonts/fontawesome-webfont.woff', // Adverts
    ],
    ampNonLive: [...bbcDomains],
    canonicalNonLive: [
      ...bbcDomains,
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/fonts/fontawesome-webfont.woff', // Adverts
    ],
  },
  mediaSrc: {
    ampLive: [...bbcDomains],
    canonicalLive: [...bbcDomains],
    ampNonLive: [...bbcDomains],
    canonicalNonLive: [...bbcDomains],
  },
  prefetchSrc: {
    ampLive: [...advertisingDirectives.prefetchSrc],
    canonicalLive: [...advertisingDirectives.prefetchSrc],
    ampNonLive: [...advertisingDirectives.prefetchSrc],
    canonicalNonLive: [...advertisingDirectives.prefetchSrc],
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

export const generateFontSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.fontSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.fontSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.fontSrc.ampLive;
  return directives.fontSrc.canonicalLive;
};

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

export const generatePrefetchSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.prefetchSrc.ampNonLive;
  if (!isLive && !isAmp) return directives.prefetchSrc.canonicalNonLive;
  if (isLive && isAmp) return directives.prefetchSrc.ampLive;
  return directives.prefetchSrc.canonicalLive;
};

const helmetCsp = ({ isAmp, isLive }) => ({
  directives: {
    'default-src': generateDefaultSrc(),
    'child-src': generateChildSrc({ isAmp }),
    'connect-src': generateConnectSrc({ isAmp, isLive }),
    'font-src': generateFontSrc({ isAmp, isLive }),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'img-src': generateImgSrc({ isAmp, isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'style-src': generateStyleSrc({ isAmp, isLive }),
    'media-src': generateMediaSrc({ isAmp, isLive }),
    'worker-src': generateWorkerSrc({ isAmp }),
    'prefetch-src': generatePrefetchSrc({ isAmp, isLive }),
    'report-to': 'default',
    'upgrade-insecure-requests': [],
  },
});

const injectCspHeader = (req, res, next) => {
  const { isAmp } = getRouteProps(req.url);
  const originHeader = req.headers['bbc-origin'];
  const { origin } = getOriginContext(originHeader);

  const isLive =
    origin === 'https://www.bbc.co.uk' || origin === 'https://www.bbc.com';

  const middleware = csp(helmetCsp({ isAmp, isLive }));
  middleware(req, res, next);
};

export default injectCspHeader;
