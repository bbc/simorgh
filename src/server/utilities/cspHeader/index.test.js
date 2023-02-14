import injectCspHeader, {
  generateChildSrc,
  generateConnectSrc,
  generateDefaultSrc,
  generateFontSrc,
  generateFrameSrc,
  generateImgSrc,
  generateScriptSrc,
  generateStyleSrc,
  generateMediaSrc,
  generateWorkerSrc,
  generatePrefetchSrc,
} from '.';

import { bbcDomains, advertisingServiceCountryDomains } from './domainLists';

// Express Fixtures
const req = ({ urlExample = '', originExample = '' } = {}) => ({
  url: urlExample,
  headers: {
    'user-agent': 'local-agent',
    'bbc-origin': originExample,
  },
});

let headers = {};

const res = {
  setHeader: (key, value) => {
    headers[key] = value;
  },
};

const next = jest.fn();

describe('cspHeader', () => {
  afterEach(() => {
    jest.resetAllMocks();
    headers = {};
  });

  afterAll(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  [
    {
      isAmp: true,
      isLive: true,
      originExample: 'https://www.bbc.com',
      urlExample: 'https://www.bbc.com/pidgin.amp',
      childSrcExpectation: ['blob:'],
      connectSrcExpectation: [
        ...bbcDomains,
        'https://*.akamaihd.net',
        'https://cdn.ampproject.org',
        'https://*.ampproject.net',
        'https://amp-error-reporting.appspot.com',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://*.twitter.com',
        'https://connect.facebook.net',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://*.googlesyndication.com',
        "'self'",
      ].sort(),
      fontSrcExpectation: [...bbcDomains].sort(),
      frameSrcExpectation: [
        ...bbcDomains,
        'https://*.ampproject.net',
        'https://*.doubleclick.net',
        'https://edigitalsurvey.com',
        'https://*.googlesyndication.com',
        'https://www.instagram.com',
        'https://www.riddle.com',
        'https://www.tiktok.com',
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com',
        'https://www.facebook.com',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      imgSrcExpectation: [
        ...bbcDomains,
        'https://*.adsafeprotected.com',
        'https://*.cdninstagram.com',
        'https://ping.chartbeat.net',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.googleusercontent.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://*.tiktokcdn.com',
        'https://*.xx.fbcdn.net',
        'https://www.instagram.com',
        'https://www.tiktok.com',
        'https://*.facebook.com',
        'https://sb.scorecardresearch.com',
        'https://i.ytimg.com',
        "data: 'self'",
      ].sort(),
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://*.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ].sort(),
      styleSrcExpectation: [...bbcDomains, "'unsafe-inline'"].sort(),
      mediaSrcExpectation: [...bbcDomains].sort(),
      workerSrcExpectation: ['blob:', '*.bbc.co.uk', '*.bbc.com'],
      prefetchSrcExpectation: ['https://*.googlesyndication.com'],
    },
    {
      isAmp: false,
      isLive: true,
      originExample: 'https://www.bbc.com',
      urlExample: 'https://www.bbc.com/pidgin',
      childSrcExpectation: ["'self'"],
      connectSrcExpectation: [
        ...bbcDomains,
        'https://*.akamaihd.net',
        'https://cognito-identity.eu-west-1.amazonaws.com',
        'https://dataplane.rum.eu-west-1.amazonaws.com',
        'https://sts.eu-west-1.amazonaws.com',
        'https://ws.bbc-reporting-api.app',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://*.optimizely.com',
        'https://*.wearehearken.eu',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://*.googlesyndication.com',
        "'self'",
      ].sort(),
      fontSrcExpectation: [
        ...bbcDomains,
        'data:',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/',
        'https://fonts.gstatic.com',
      ].sort(),
      frameSrcExpectation: [
        ...bbcDomains,
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com',
        'https://*.twitter.com',
        'https://www.instagram.com',
        'https://bbc.com',
        'https://bbc-maps.carto.com',
        'https://flo.uri.sh',
        'https://www.riddle.com',
        'https://*.doubleclick.net',
        'https://*.googlesyndication.com',
        'https://edigitalsurvey.com',
        'https://www.tiktok.com',
        'https://*.facebook.com',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      imgSrcExpectation: [
        ...bbcDomains,
        'https://*.adsafeprotected.com',
        'https://*.cdninstagram.com',
        'https://ping.chartbeat.net',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.googleusercontent.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://sb.scorecardresearch.com',
        'https://*.twimg.com',
        'https://*.twitter.com',
        'https://i.ytimg.com',
        'https://*.tiktokcdn.com',
        'https://*.xx.fbcdn.net',
        "data: 'self'",
      ].sort(),
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://*.adsafeprotected.com',
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://*.g.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://public.flourish.studio',
        'https://adservice.google.co.uk',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://www.googletagservices.com',
        'https://bbc.gscontxt.net',
        'https://*.imrworldwide.com',
        'https://cdn.privacy-mgmt.com',
        'https://www.instagram.com',
        'https://sb.scorecardresearch.com',
        'https://*.twimg.com',
        'https://*.twitter.com',
        'https://*.wearehearken.eu',
        'https://www.tiktok.com',
        'https://lf16-tiktok-web.ttwstatic.com',
        'https://*.facebook.com',
        'https://connect.facebook.net',
        'https://*.xx.fbcdn.net',
        ...advertisingServiceCountryDomains,
        "'self'",
        "'unsafe-inline'",
      ].sort(),
      styleSrcExpectation: [
        ...bbcDomains,
        'https://*.twitter.com',
        'https://*.twimg.com',
        'https://fonts.googleapis.com',
        'https://lf16-tiktok-web.ttwstatic.com',
        'https://*.xx.fbcdn.net',
        "'unsafe-inline'",
      ].sort(),
      mediaSrcExpectation: [...bbcDomains].sort(),
      workerSrcExpectation: ["'self'", '*.bbc.co.uk', '*.bbc.com'],
      prefetchSrcExpectation: ['https://*.googlesyndication.com'],
    },
    {
      isAmp: true,
      isLive: false,
      originExample: 'https://www.test.bbc.com',
      urlExample: 'https://www.test.bbc.com/pidgin.amp',
      childSrcExpectation: ['blob:'],
      connectSrcExpectation: [
        ...bbcDomains,
        'https://*.akamaihd.net',
        'https://cdn.ampproject.org',
        'https://*.ampproject.net',
        'https://amp-error-reporting.appspot.com',
        'https://logws1363.ati-host.net',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://cdn.privacy-mgmt.com',
        'https://*.twitter.com',
        'https://connect.facebook.net',
        "'self'",
      ].sort(),
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://*.googlesyndication.com',
        "'self'",
      ].sort(),
      fontSrcExpectation: [...bbcDomains],
      frameSrcExpectation: [
        ...bbcDomains,
        'https://*.ampproject.net',
        'https://*.doubleclick.net',
        'https://edigitalsurvey.com',
        'https://*.googlesyndication.com',
        'https://www.instagram.com',
        'https://www.riddle.com',
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com',
        'https://www.tiktok.com',
        'https://www.facebook.com',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      imgSrcExpectation: [
        ...bbcDomains,
        'https://*.adsafeprotected.com',
        'https://logws1363.ati-host.net',
        'https://*.cdninstagram.com',
        'https://ping.chartbeat.net',
        'http://ping.chartbeat.net',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.googleusercontent.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://www.instagram.com',
        'https://sb.scorecardresearch.com',
        'https://i.ytimg.com',
        'https://www.tiktok.com',
        'https://*.tiktokcdn.com',
        'https://*.facebook.com',
        'https://*.xx.fbcdn.net',
        "data: 'self'",
      ].sort(),
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://*.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ].sort(),
      styleSrcExpectation: [...bbcDomains, "'unsafe-inline'"].sort(),
      mediaSrcExpectation: [...bbcDomains].sort(),
      workerSrcExpectation: ['blob:', '*.bbc.co.uk', '*.bbc.com'],
      prefetchSrcExpectation: ['https://*.googlesyndication.com'],
    },
    {
      isAmp: false,
      isLive: false,
      originExample: 'https://www.test.bbc.com',
      urlExample: 'https://www.test.bbc.com/pidgin',
      childSrcExpectation: ["'self'"],
      connectSrcExpectation: [
        ...bbcDomains,
        'https://*.akamaihd.net',
        'https://logws1363.ati-host.net',
        'https://ws.bbc-reporting-api.app',
        'https://cognito-identity.eu-west-1.amazonaws.com',
        'https://dataplane.rum.eu-west-1.amazonaws.com',
        'https://sts.eu-west-1.amazonaws.com',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://*.optimizely.com',
        'https://*.wearehearken.eu',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://*.googlesyndication.com',
        "'self'",
      ].sort(),
      fontSrcExpectation: [
        ...bbcDomains,
        'data:',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/',
        'https://fonts.gstatic.com',
      ].sort(),
      frameSrcExpectation: [
        ...bbcDomains,
        'https://bbc-maps.carto.com',
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://*.doubleclick.net',
        'https://edigitalsurvey.com',
        'https://bbc.com',
        'https://flo.uri.sh',
        'https://*.googlesyndication.com',
        'https://www.instagram.com',
        'https://www.riddle.com',
        'https://*.twitter.com',
        'https://www.youtube.com',
        'https://www.youtube-nocookie.com',
        'https://www.tiktok.com',
        'https://*.facebook.com',
        'https://cdn.privacy-mgmt.com',
        "'self'",
      ].sort(),
      imgSrcExpectation: [
        ...bbcDomains,
        'https://ping.chartbeat.net',
        'https://logws1363.ati-host.net',
        'http://ping.chartbeat.net',
        'https://*.twitter.com',
        'https://*.cdninstagram.com',
        'https://*.adsafeprotected.com',
        'https://i.ytimg.com',
        'https://*.twimg.com',
        'https://*.doubleclick.net',
        'https://*.effectivemeasure.net',
        'https://*.google.com',
        'https://*.googlesyndication.com',
        'https://*.googleusercontent.com',
        'https://*.gstatic.com',
        'https://*.imrworldwide.com',
        'https://sb.scorecardresearch.com',
        'https://*.tiktokcdn.com',
        'https://*.xx.fbcdn.net',
        "data: 'self'",
      ].sort(),
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://*.wearehearken.eu',
        'https://*.chartbeat.com',
        'http://*.chartbeat.com',
        'http://localhost:1124',
        'https://*.twitter.com',
        'https://www.instagram.com',
        'https://*.twimg.com',
        'https://public.flourish.studio',
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
        'https://www.tiktok.com',
        'https://lf16-tiktok-web.ttwstatic.com',
        'https://*.facebook.com',
        'https://connect.facebook.net',
        'https://*.xx.fbcdn.net',
        ...advertisingServiceCountryDomains,
        "'self'",
        "'unsafe-inline'",
      ].sort(),
      styleSrcExpectation: [
        ...bbcDomains,
        'https://*.twitter.com',
        'https://*.twimg.com',
        'https://fonts.googleapis.com',
        'https://lf16-tiktok-web.ttwstatic.com',
        'https://*.xx.fbcdn.net',
        "'unsafe-inline'",
      ].sort(),
      mediaSrcExpectation: [...bbcDomains].sort(),
      workerSrcExpectation: ["'self'", '*.bbc.co.uk', '*.bbc.com'],
      prefetchSrcExpectation: ['https://*.googlesyndication.com'].sort(),
    },
  ].forEach(
    ({
      isAmp,
      isLive,
      originExample,
      urlExample,
      childSrcExpectation,
      connectSrcExpectation,
      defaultSrcExpectation,
      fontSrcExpectation,
      frameSrcExpectation,
      imgSrcExpectation,
      scriptSrcExpectation,
      styleSrcExpectation,
      mediaSrcExpectation,
      workerSrcExpectation,
      prefetchSrcExpectation,
    }) => {
      describe(`Given isAmp ${isAmp} & isLive ${isLive}`, () => {
        it(`Then it has this childSrc`, () => {
          expect(generateChildSrc({ isAmp, isLive })).toEqual(
            childSrcExpectation,
          );
        });

        it(`Then it has this connectSrc`, () => {
          expect(generateConnectSrc({ isAmp, isLive })).toEqual(
            connectSrcExpectation,
          );
        });

        it(`Then it has this defaultSrc`, () => {
          expect(generateDefaultSrc({ isAmp, isLive })).toEqual(
            defaultSrcExpectation,
          );
        });

        it(`Then it has this fontSrc`, () => {
          expect(generateFontSrc({ isAmp, isLive })).toEqual(
            fontSrcExpectation,
          );
        });

        it(`Then it has this frameSrc`, () => {
          expect(generateFrameSrc({ isAmp, isLive })).toEqual(
            frameSrcExpectation,
          );
        });

        it(`Then it has this imgSrc`, () => {
          expect(generateImgSrc({ isAmp, isLive })).toEqual(imgSrcExpectation);
        });

        it(`Then it has this scriptSrc`, () => {
          expect(generateScriptSrc({ isAmp, isLive })).toEqual(
            scriptSrcExpectation,
          );
        });

        it(`Then it has this styleSrc`, () => {
          expect(generateStyleSrc({ isAmp, isLive })).toEqual(
            styleSrcExpectation,
          );
        });

        it(`Then it has this mediaSrc`, () => {
          expect(generateMediaSrc({ isAmp, isLive })).toEqual(
            mediaSrcExpectation,
          );
        });

        it(`Then it has this workerSrc`, () => {
          expect(generateWorkerSrc({ isAmp })).toEqual(workerSrcExpectation);
        });

        it(`Then it has this prefetchSrc`, () => {
          expect(generatePrefetchSrc({ isAmp, isLive })).toEqual(
            prefetchSrcExpectation,
          );
        });

        it(`Then injectCspHeader middleware applies the correct Content-Security-Policy header`, () => {
          process.env.SIMORGH_APP_ENV = isLive ? 'live' : 'test';

          injectCspHeader(req({ urlExample, originExample }), res, next);

          expect(next).toHaveBeenCalled();

          const expectedCSPHeaderString =
            `default-src ${defaultSrcExpectation.join(' ')};` +
            `child-src ${childSrcExpectation.join(' ')};` +
            `connect-src ${connectSrcExpectation.join(' ')};` +
            `font-src ${fontSrcExpectation.join(' ')};` +
            `frame-src ${frameSrcExpectation.join(' ')};` +
            `img-src ${imgSrcExpectation.join(' ')};` +
            `script-src ${scriptSrcExpectation.join(' ')};` +
            `style-src ${styleSrcExpectation.join(' ')};` +
            `media-src ${mediaSrcExpectation.join(' ')};` +
            `worker-src ${workerSrcExpectation.join(' ')};` +
            `prefetch-src ${prefetchSrcExpectation.join(' ')};` +
            `report-to worldsvc;` +
            `upgrade-insecure-requests`;

          expect(headers['Content-Security-Policy']).toEqual(
            expectedCSPHeaderString,
          );
        });

        it(`applies the correct report-to header`, () => {
          process.env.SIMORGH_APP_ENV = isLive ? 'live' : 'test';
          process.env.SIMORGH_CSP_REPORTING_ENDPOINT = 'mocked-value';

          injectCspHeader(req({ urlExample, originExample }), res, next);

          expect(headers['report-to']).toEqual(
            JSON.stringify({
              group: 'worldsvc',
              max_age: 2592000,
              endpoints: [
                {
                  url: 'mocked-value',
                  priority: 1,
                },
              ],
              include_subdomains: true,
            }),
          );
        });
      });
    },
  );
});
