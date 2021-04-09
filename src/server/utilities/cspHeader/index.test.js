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

const next = jest.fn();

describe('cspHeader', () => {
  afterEach(() => {
    jest.resetAllMocks();
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
        'https://platform.twitter.com',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://*.g.doubleclick.net',
        'https://survey.effectivemeasure.net',
        'https://collector.effectivemeasure.net',
        'https://detect-survey.effectivemeasure.net',
        'https://adservice.google.com',
        'https://tpc.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://fundingchoicesmessages.google.com',
        'https://secure-dcr-cert.imrworldwide.com',
        'https://pixel.adsafeprotected.com',
        'https://cdn.adsafeprotected.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://tpc.googlesyndication.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      fontSrcExpectation: [...bbcDomains],
      frameSrcExpectation: [
        ...bbcDomains,
        'https://www.youtube.com',
        'https://www.instagram.com',
        'https://*.ampproject.net',
        'https://www.riddle.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://edigitalsurvey.com',
        'https://*.safeframe.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://secureframe.doubleclick.net',
        "'self'",
      ],
      imgSrcExpectation: [
        ...bbcDomains,
        'https://ping.chartbeat.net',
        'https://i.ytimg.com',
        'https://www.instagram.com',
        'https://*.cdninstagram.com',
        'https://collector.effectivemeasure.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://sb.scorecardresearch.com',
        'https://secure-us.imrworldwide.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://*.google.com',
        'https://dt.adsafeprotected.com',
        'https://dtvc.adsafeprotected.com',
        'https://fwvc.adsafeprotected.com',
        'https://pixel.adsafeprotected.com',
        'https://ad.doubleclick.net',
        'https://static.doubleclick.net',
        'https://www.gstatic.com',
        'https://*.googleusercontent.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://platform.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [...bbcDomains, "'unsafe-inline'"],
      mediaSrcExpectation: [...bbcDomains],
      workerSrcExpectation: ['blob:'],
      prefetchSrcExpectation: ['https://*.safeframe.googlesyndication.com'],
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
        'https://europe-west1-bbc-otg-traf-mgr-bq-prod-4591.cloudfunctions.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://*.g.doubleclick.net',
        'https://survey.effectivemeasure.net',
        'https://collector.effectivemeasure.net',
        'https://detect-survey.effectivemeasure.net',
        'https://adservice.google.com',
        'https://tpc.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://fundingchoicesmessages.google.com',
        'https://secure-dcr-cert.imrworldwide.com',
        'https://pixel.adsafeprotected.com',
        'https://cdn.adsafeprotected.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://tpc.googlesyndication.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      fontSrcExpectation: [
        ...bbcDomains,
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/fonts/fontawesome-webfont.woff',
        'https://fonts.gstatic.com',
      ],
      frameSrcExpectation: [
        ...bbcDomains,
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://www.youtube.com',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://syndication.twitter.com',
        'https://bbc.com',
        'https://bbc-maps.carto.com',
        'https://flo.uri.sh',
        'https://www.riddle.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://edigitalsurvey.com',
        'https://*.safeframe.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://secureframe.doubleclick.net',
        "'self'",
      ],
      imgSrcExpectation: [
        ...bbcDomains,
        'https://ping.chartbeat.net',
        'https://syndication.twitter.com',
        'https://platform.twitter.com',
        'https://pbs.twimg.com',
        'https://i.ytimg.com',
        'https://ton.twimg.com',
        'https://collector.effectivemeasure.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://sb.scorecardresearch.com',
        'https://secure-us.imrworldwide.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://*.google.com',
        'https://dt.adsafeprotected.com',
        'https://dtvc.adsafeprotected.com',
        'https://fwvc.adsafeprotected.com',
        'https://pixel.adsafeprotected.com',
        'https://ad.doubleclick.net',
        'https://static.doubleclick.net',
        'https://www.gstatic.com',
        'https://*.googleusercontent.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://*.chartbeat.com',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://cdn.syndication.twimg.com',
        'https://public.flourish.studio',
        'https://adservice.google.co.uk',
        'https://adservice.google.com',
        'https://cdn.ampproject.org',
        'https://collector.effectivemeasure.net',
        'https://me-ssl.effectivemeasure.net',
        'https://pixel.adsafeprotected.com',
        'https://sb.scorecardresearch.com',
        'https://static.adsafeprotected.com',
        'https://*.g.doubleclick.net',
        'https://t.effectivemeasure.net',
        'https://tpc.googlesyndication.com',
        'https://www.googletagservices.com',
        'https://bbc.gscontxt.net',
        'https://secure-us.imrworldwide.com/',
        'https://fundingchoicesmessages.google.com',
        'https://pagead2.googlesyndication.com',
        ...advertisingServiceCountryDomains,
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [
        ...bbcDomains,
        'https://platform.twitter.com',
        'https://ton.twimg.com',
        'https://fonts.googleapis.com',
        "'unsafe-inline'",
      ],
      mediaSrcExpectation: [...bbcDomains],
      workerSrcExpectation: ["'self'"],
      prefetchSrcExpectation: ['https://*.safeframe.googlesyndication.com'],
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
        'https://platform.twitter.com',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://*.g.doubleclick.net',
        'https://survey.effectivemeasure.net',
        'https://collector.effectivemeasure.net',
        'https://detect-survey.effectivemeasure.net',
        'https://adservice.google.com',
        'https://tpc.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://fundingchoicesmessages.google.com',
        'https://secure-dcr-cert.imrworldwide.com',
        'https://pixel.adsafeprotected.com',
        'https://cdn.adsafeprotected.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://tpc.googlesyndication.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      fontSrcExpectation: [...bbcDomains],
      frameSrcExpectation: [
        ...bbcDomains,
        'https://www.youtube.com',
        'https://www.instagram.com',
        'https://*.ampproject.net',
        'https://www.riddle.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://edigitalsurvey.com',
        'https://*.safeframe.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://secureframe.doubleclick.net',
        "'self'",
      ],
      imgSrcExpectation: [
        ...bbcDomains,
        'https://ping.chartbeat.net',
        'https://logws1363.ati-host.net',
        'http://ping.chartbeat.net',
        'https://i.ytimg.com',
        'https://www.instagram.com',
        'https://*.cdninstagram.com',
        'https://collector.effectivemeasure.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://sb.scorecardresearch.com',
        'https://secure-us.imrworldwide.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://*.google.com',
        'https://dt.adsafeprotected.com',
        'https://dtvc.adsafeprotected.com',
        'https://fwvc.adsafeprotected.com',
        'https://pixel.adsafeprotected.com',
        'https://ad.doubleclick.net',
        'https://static.doubleclick.net',
        'https://www.gstatic.com',
        'https://*.googleusercontent.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://platform.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [...bbcDomains, "'unsafe-inline'"],
      mediaSrcExpectation: [...bbcDomains],
      workerSrcExpectation: ['blob:'],
      prefetchSrcExpectation: ['https://*.safeframe.googlesyndication.com'],
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
        'https://europe-west1-bbc-otg-traf-mgr-bq-dev-4105.cloudfunctions.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://*.g.doubleclick.net',
        'https://survey.effectivemeasure.net',
        'https://collector.effectivemeasure.net',
        'https://detect-survey.effectivemeasure.net',
        'https://adservice.google.com',
        'https://tpc.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://fundingchoicesmessages.google.com',
        'https://secure-dcr-cert.imrworldwide.com',
        'https://pixel.adsafeprotected.com',
        'https://cdn.adsafeprotected.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      defaultSrcExpectation: [
        ...bbcDomains,
        'https://tpc.googlesyndication.com',
        'https://*.safeframe.googlesyndication.com',
        "'self'",
      ],
      fontSrcExpectation: [
        ...bbcDomains,
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/fonts/fontawesome-webfont.woff',
        'https://fonts.gstatic.com',
      ],
      frameSrcExpectation: [
        ...bbcDomains,
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://www.youtube.com',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://syndication.twitter.com',
        'https://bbc.com',
        'https://bbc-maps.carto.com',
        'https://flo.uri.sh',
        'https://www.riddle.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://edigitalsurvey.com',
        'https://*.safeframe.googlesyndication.com',
        'https://ad.doubleclick.net',
        'https://secureframe.doubleclick.net',
        "'self'",
      ],
      imgSrcExpectation: [
        ...bbcDomains,
        'https://ping.chartbeat.net',
        'https://logws1363.ati-host.net',
        'http://ping.chartbeat.net',
        'https://syndication.twitter.com',
        'https://platform.twitter.com',
        'https://pbs.twimg.com',
        'https://i.ytimg.com',
        'https://ton.twimg.com',
        'https://collector.effectivemeasure.net',
        'https://csi.gstatic.com',
        'https://pagead2.googlesyndication.com',
        'https://sb.scorecardresearch.com',
        'https://secure-us.imrworldwide.com',
        'https://*.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://*.google.com',
        'https://dt.adsafeprotected.com',
        'https://dtvc.adsafeprotected.com',
        'https://fwvc.adsafeprotected.com',
        'https://pixel.adsafeprotected.com',
        'https://ad.doubleclick.net',
        'https://static.doubleclick.net',
        'https://www.gstatic.com',
        'https://*.googleusercontent.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        ...bbcDomains,
        'https://*.chartbeat.com',
        'http://*.chartbeat.com',
        'http://localhost:1124',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://cdn.syndication.twimg.com',
        'https://public.flourish.studio',
        'https://adservice.google.co.uk',
        'https://adservice.google.com',
        'https://cdn.ampproject.org',
        'https://collector.effectivemeasure.net',
        'https://me-ssl.effectivemeasure.net',
        'https://pixel.adsafeprotected.com',
        'https://sb.scorecardresearch.com',
        'https://static.adsafeprotected.com',
        'https://*.g.doubleclick.net',
        'https://t.effectivemeasure.net',
        'https://tpc.googlesyndication.com',
        'https://www.googletagservices.com',
        'https://bbc.gscontxt.net',
        'https://secure-us.imrworldwide.com/',
        'https://fundingchoicesmessages.google.com',
        'https://pagead2.googlesyndication.com',
        ...advertisingServiceCountryDomains,
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [
        ...bbcDomains,
        'https://platform.twitter.com',
        'https://ton.twimg.com',
        'https://fonts.googleapis.com',
        "'unsafe-inline'",
      ],
      mediaSrcExpectation: [...bbcDomains],
      workerSrcExpectation: ["'self'"],
      prefetchSrcExpectation: ['https://*.safeframe.googlesyndication.com'],
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
          const req = {
            url: urlExample,
            headers: {
              'user-agent': 'local-agent',
              'bbc-origin': originExample,
            },
          };

          const headers = {};

          const res = {
            setHeader: (key, value) => {
              headers[key] = value;
            },
          };

          injectCspHeader(req, res, next);

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
            `report-to default;` +
            `upgrade-insecure-requests`;

          expect(headers['Content-Security-Policy']).toEqual(
            expectedCSPHeaderString,
          );
        });
      });
    },
  );
});
