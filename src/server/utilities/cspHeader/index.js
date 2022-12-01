import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import isLiveEnv from '#lib/utilities/isLive';
import { bbcDomains, advertisingServiceCountryDomains } from './domainLists';

/*
 * On localhost these CSP headers currently only apply on the production build.
 * `yarn build && yarn start` & visit a localhost URL.
 * View the developer console for errors.
 */

const cloudwatchRumDirectives = {
  connectSrc: [
    'https://cognito-identity.eu-west-1.amazonaws.com',
    'https://sts.eu-west-1.amazonaws.com',
    'https://dataplane.rum.eu-west-1.amazonaws.com',
  ],
};

const advertisingDirectives = {
  connectSrc: [
    'https://*.doubleclick.net',
    'https://*.effectivemeasure.net',
    'https://*.google.com',
    'https://*.googlesyndication.com',
    'https://*.gstatic.com',
    'https://*.imrworldwide.com',
  ],
  frameSrc: [
    'https://*.doubleclick.net',
    'https://edigitalsurvey.com',
    'https://*.googlesyndication.com',
  ],
  imgSrc: [
    'https://*.adsafeprotected.com',
    'https://*.doubleclick.net',
    'https://*.effectivemeasure.net',
    'https://*.google.com',
    'https://*.googlesyndication.com',
    'https://*.gstatic.com',
    'https://*.imrworldwide.com',
    'https://sb.scorecardresearch.com',
  ],
  scriptSrc: [
    'https://*.adsafeprotected.com',
    'https://cdn.ampproject.org',
    'https://*.g.doubleclick.net',
    'https://*.effectivemeasure.net',
    'https://adservice.google.co.uk',
    'https://*.google.com',
    'https://*.googlesyndication.com',
    'https://www.googletagservices.com',
    'https://bbc.gscontxt.net',
    'https://sb.scorecardresearch.com',
    'https://*.imrworldwide.com',
    ...advertisingServiceCountryDomains,
  ],
  prefetchSrc: ['https://*.googlesyndication.com'],
  defaultSrc: [...bbcDomains, 'https://*.googlesyndication.com'],
  styleSrc: ['https://fonts.googleapis.com'],
  fontSrc: ['https://fonts.gstatic.com'],
};

const directives = {
  connectSrc: {
    ampLive: [
      ...bbcDomains,
      'https://*.akamaihd.net',
      'https://cdn.ampproject.org', // AMP
      'https://*.ampproject.net', // Social Embeds
      'https://amp-error-reporting.appspot.com', // AMP
      'https://*.twitter.com', // Social Embeds, <amp-twitter />
      'https://connect.facebook.net', // Social Embeds, <amp-facebook />
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://*.wearehearken.eu',
      'https://*.akamaihd.net',
      'https://*.optimizely.com',
      'https://ws.bbc-reporting-api.app', // Web-Vitals monitoring
      ...cloudwatchRumDirectives.connectSrc,
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
      'https://*.twitter.com', // Social Embeds, <amp-twitter />
      'https://connect.facebook.net', // Social Embeds, <amp-facebook />
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://*.wearehearken.eu',
      'https://*.akamaihd.net',
      'https://logws1363.ati-host.net', // ATI
      'https://*.optimizely.com',
      'https://ws.bbc-reporting-api.app', // Web-Vitals monitoring
      ...cloudwatchRumDirectives.connectSrc,
      ...advertisingDirectives.connectSrc,
      "'self'",
    ],
  },
  frameSrc: {
    ampLive: [
      ...bbcDomains,
      'https://www.youtube.com', // Social Embeds, <amp-youtube />
      'https://www.youtube-nocookie.com', // Social Embeds, youtube no-cookie
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://www.tiktok.com', // Social Embeds, <amp-tiktok />
      'https://www.facebook.com', // Social Embeds, <amp-facebook />
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
      'https://www.youtube-nocookie.com', // Social Embeds, youtube no-cookie
      'https://www.instagram.com', // Social Embeds
      'https://www.tiktok.com', // Social Embeds
      'https://*.facebook.com', // Social Embeds
      'https://*.twitter.com', // Social Embeds
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
      'https://www.youtube-nocookie.com', // Social Embeds, youtube no-cookie
      'https://www.instagram.com', // Social Embeds, <amp-instagram />
      'https://www.tiktok.com', // Social Embeds, <amp-tiktok />
      'https://www.facebook.com', // Social Embeds, <amp-facebook />
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
      'https://www.youtube-nocookie.com', // Social Embeds, youtube no-cookie
      'https://www.instagram.com', // Social Embeds
      'https://www.tiktok.com', // Social Embeds
      'https://*.facebook.com', // Social Embeds
      'https://*.twitter.com', // Social Embeds
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
      'https://www.tiktok.com', // Social Embeds, <amp-tiktok />
      'https://*.tiktokcdn.com', // Social Embeds, <amp-tiktok />
      'https://*.facebook.com', // Social Embeds, <amp-facebook />
      'https://*.xx.fbcdn.net', // Social Embeds, <amp-facebook />
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net',
      'https://*.twitter.com', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://*.cdninstagram.com', // Social Embeds
      'https://*.tiktokcdn.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://*.xx.fbcdn.net', // Social Embeds
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
      'https://www.tiktok.com', // Social Embeds, <amp-tiktok />
      'https://*.tiktokcdn.com', // Social Embeds, <amp-tiktok />
      'https://*.facebook.com', // Social Embeds, <amp-facebook />
      'https://*.xx.fbcdn.net', // Social Embeds, <amp-facebook />
      ...advertisingDirectives.imgSrc,
      'https://*.googleusercontent.com', // Google Play Store - BBC News Apps - Arabic, Hindi, Mundo, Russian
      "data: 'self'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://ping.chartbeat.net', // Chartbeat
      'https://logws1363.ati-host.net', // ATI analytics
      'http://ping.chartbeat.net', // localhost prod build
      'https://*.twitter.com', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://*.cdninstagram.com', // Social Embeds
      'https://*.tiktokcdn.com', // Social Embeds
      'https://i.ytimg.com', // Social Embeds
      'https://*.xx.fbcdn.net', // Social Embeds
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
      'https://*.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalLive: [
      ...bbcDomains,
      'https://*.wearehearken.eu',
      'https://*.chartbeat.com',
      'https://*.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://www.tiktok.com', // Social Embeds
      'https://lf16-tiktok-web.ttwstatic.com', // Social Embeds - TikTok
      'https://*.facebook.com', // Social Embeds
      'https://connect.facebook.net', // Social Embeds
      'https://*.xx.fbcdn.net', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://public.flourish.studio', // STY includes
      'https://client.rum.us-east-1.amazonaws.com', // CloudWatch RUM
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.twitter.com', // Social Embeds, <amp-twitter />
      "'self'",
      "'unsafe-inline'",
    ],
    canonicalNonLive: [
      ...bbcDomains,
      'https://*.wearehearken.eu',
      'https://*.chartbeat.com',
      'http://*.chartbeat.com', // for localhost canonical connecting via http
      'http://localhost:1124', // for localhost canonical JavaScript
      'https://*.twitter.com', // Social Embeds
      'https://www.instagram.com', // Social Embeds
      'https://www.tiktok.com', // Social Embeds
      'https://lf16-tiktok-web.ttwstatic.com', // Social Embeds - TikTok
      'https://*.facebook.com', // Social Embeds
      'https://connect.facebook.net', // Social Embeds
      'https://*.xx.fbcdn.net', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://public.flourish.studio', // STY includes
      'https://client.rum.us-east-1.amazonaws.com', // CloudWatch RUM
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
  },
  styleSrc: {
    ampLive: [...bbcDomains, "'unsafe-inline'"],
    canonicalLive: [
      ...bbcDomains,
      'https://*.twitter.com', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://lf16-tiktok-web.ttwstatic.com', // Social Embeds - TikTok
      'https://*.xx.fbcdn.net', // Social Embeds
      ...advertisingDirectives.styleSrc,
      "'unsafe-inline'",
    ],
    ampNonLive: [...bbcDomains, "'unsafe-inline'"],
    canonicalNonLive: [
      ...bbcDomains,
      'https://*.twitter.com', // Social Embeds
      'https://*.twimg.com', // Social Embeds
      'https://lf16-tiktok-web.ttwstatic.com', // Social Embeds - TikTok
      'https://*.xx.fbcdn.net', // Social Embeds
      ...advertisingDirectives.styleSrc,
      "'unsafe-inline'",
    ],
  },
  fontSrc: {
    ampLive: [...bbcDomains],
    canonicalLive: [
      ...bbcDomains,
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/', // Adverts
      ...advertisingDirectives.fontSrc,
    ],
    ampNonLive: [...bbcDomains],
    canonicalNonLive: [
      ...bbcDomains,
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/', // Adverts
      ...advertisingDirectives.fontSrc,
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
  if (!isLive && isAmp) return directives.connectSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.connectSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.connectSrc.ampLive.sort();
  return directives.connectSrc.canonicalLive.sort();
};

export const generateDefaultSrc = () => {
  return [...advertisingDirectives.defaultSrc, "'self'"].sort();
};

export const generateFontSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.fontSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.fontSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.fontSrc.ampLive.sort();
  return directives.fontSrc.canonicalLive.sort();
};

export const generateFrameSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.frameSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.frameSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.frameSrc.ampLive.sort();
  return directives.frameSrc.canonicalLive.sort();
};

export const generateImgSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.imgSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.imgSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.imgSrc.ampLive.sort();
  return directives.imgSrc.canonicalLive.sort();
};

export const generateScriptSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.scriptSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.scriptSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.scriptSrc.ampLive.sort();
  return directives.scriptSrc.canonicalLive.sort();
};

export const generateStyleSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.styleSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.styleSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.styleSrc.ampLive.sort();
  return directives.styleSrc.canonicalLive.sort();
};

export const generateMediaSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.mediaSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.mediaSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.mediaSrc.ampLive.sort();
  return directives.mediaSrc.canonicalLive.sort();
};

export const generateWorkerSrc = ({ isAmp }) =>
  isAmp ? ['blob:'] : ["'self'"];

export const generatePrefetchSrc = ({ isAmp, isLive }) => {
  if (!isLive && isAmp) return directives.prefetchSrc.ampNonLive.sort();
  if (!isLive && !isAmp) return directives.prefetchSrc.canonicalNonLive.sort();
  if (isLive && isAmp) return directives.prefetchSrc.ampLive.sort();
  return directives.prefetchSrc.canonicalLive.sort();
};

const helmetCsp = ({ isAmp, isLive, reportOnlyOnLive }) => ({
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
    'report-to': 'worldsvc',
    'upgrade-insecure-requests': [],
  },
  reportOnly: reportOnlyOnLive,
});

const injectCspHeader = (req, res, next) => {
  const { isAmp, service } = getRouteProps(req.url);

  res.setHeader(
    'report-to',
    JSON.stringify({
      group: 'worldsvc',
      max_age: 2592000,
      endpoints: [
        {
          url: process.env.SIMORGH_CSP_REPORTING_ENDPOINT,
          priority: 1,
        },
      ],
      include_subdomains: true,
    }),
  );

  const middleware = csp(
    helmetCsp({
      isAmp,
      isLive: isLiveEnv(),
      reportOnlyOnLive: service === 'japanese',
    }),
  );
  middleware(req, res, next);
};

export default injectCspHeader;
