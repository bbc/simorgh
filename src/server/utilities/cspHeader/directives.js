import { bbcDomains, advertisingServiceCountryDomains } from './domainLists';

const advertisingDirectives = {
  frameSrc: [
    'https://*.doubleclick.net',
    'https://edigitalsurvey.com',
    'https://*.googleadservices.com',
    'https://*.googlesyndication.com',
    'https://cdn.privacy-mgmt.com',
    'https://*.google.com',
    'https://*.amazon-adsystem.com',
    'https://*.teads.tv',
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
    'https://*.amazon-adsystem.com',
    'https://www.googleadservices.com',
    'https://*.teads.tv',
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
    'https://cdn.privacy-mgmt.com',
    'https://*.permutive.com',
    'https://*.webcontentassessor.com',
    'https://*.amazon-adsystem.com',
    'https://*.teads.tv',
    ...advertisingServiceCountryDomains,
  ],
  defaultSrc: [...bbcDomains, 'https://*.googlesyndication.com'],
  styleSrc: ['https://fonts.googleapis.com'],
  fontSrc: [
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/',
    'https://*.teads.tv',
  ],
};

const directives = {
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
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://public.flourish.studio', // Flourish embeds
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://public.flourish.studio', // Flourish embeds
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://www.riddle.com',
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
      ...advertisingDirectives.scriptSrc,
      "'self'",
      "'unsafe-inline'",
    ],
    ampNonLive: [
      ...bbcDomains,
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.twitter.com', // Social Embeds, <amp-twitter />
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'https://www.riddle.com',
      'https://*.mapcreator.io', // Election includes
      'https://*.thomsonreuters.com', // Election includes
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
      'data:', // localstorage
      ...advertisingDirectives.fontSrc,
    ],
    ampNonLive: [...bbcDomains],
    canonicalNonLive: [
      ...bbcDomains,
      'data:',
      ...advertisingDirectives.fontSrc,
    ],
  },
};

export const generateChildSrc = ({ isAmp }) => (isAmp ? ['blob:'] : ["'self'"]);

export const generateConnectSrc = () => {
  return ["'self' https:"];
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

export const generateMediaSrc = () => {
  return ["'self' blob: https:"];
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

export const generateWorkerSrc = ({ isAmp }) =>
  isAmp
    ? ['blob:', '*.bbc.co.uk', '*.bbc.com']
    : ['blob:', "'self'", '*.bbc.co.uk', '*.bbc.com'];

/*
 * On localhost these CSP headers currently only apply on the production build.
 * `yarn build && yarn start` & visit a localhost URL.
 * View the developer console for errors.
 */
export const cspDirectives = ({ isAmp, isLive, service }) => ({
  directives: {
    'default-src': generateDefaultSrc(),
    'child-src': generateChildSrc({ isAmp }),
    'connect-src': generateConnectSrc(),
    'font-src': generateFontSrc({ isAmp, isLive }),
    'frame-src': generateFrameSrc({ isAmp, isLive }),
    'img-src': generateImgSrc({ isAmp, isLive }),
    'script-src': generateScriptSrc({ isAmp, isLive }),
    'style-src': generateStyleSrc({ isAmp, isLive }),
    'media-src': generateMediaSrc(),
    'worker-src': generateWorkerSrc({ isAmp }),
    'report-to': 'worldsvc',
    'upgrade-insecure-requests': [],
  },
  reportOnly: service === 'japanese',
});
