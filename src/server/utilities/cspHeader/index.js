import csp from 'helmet-csp';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import isLiveEnv from '#lib/utilities/isLive';
import {
  generateDefaultSrc,
  generateChildSrc,
  generateConnectSrc,
  generateFontSrc,
  generateFrameSrc,
  generateImgSrc,
  generateScriptSrc,
  generateStyleSrc,
  generateMediaSrc,
  generateWorkerSrc,
} from './directiveGenerators';
/*
 * On localhost these CSP headers currently only apply on the production build.
 * `yarn build && yarn start` & visit a localhost URL.
 * View the developer console for errors.
 */

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
