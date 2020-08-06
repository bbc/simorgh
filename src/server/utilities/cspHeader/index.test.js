import injectCspHeader, {
  generateChildSrc,
  generateConnectSrc,
  generateDefaultSrc,
  generateFontSrc,
  generateFrameSrc,
  generateImgSrc,
  generateScriptSrc,
  generateStyleSrc,
  generateWorkerSrc,
} from '.';

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
        'https://*.akamaihd.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://config.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://*.ampproject.net',
        'https://amp-error-reporting.appspot.com',
        'https://www.bbc.co.uk',
        'https://platform.twitter.com',
        'https://mybbc-analytics.files.bbci.co.uk',
        "'self'",
      ],
      defaultSrcExpectation: ["'self'"],
      fontSrcExpectation: [
        'https://gel.files.bbci.co.uk',
        'https://ws-downloads.files.bbci.co.uk',
      ],
      frameSrcExpectation: [
        'https://polling.bbc.co.uk',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.youtube.com',
        'https://www.instagram.com',
        'https://*.ampproject.net',
        'https://news.files.bbci.co.uk',
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://news.files.bbci.co.uk',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://sb.scorecardresearch.com',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://i.ytimg.com',
        'https://www.instagram.com',
        'https://*.cdninstagram.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://platform.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: ['https://news.files.bbci.co.uk', "'unsafe-inline'"],
      workerSrcExpectation: ['blob:'],
    },
    {
      isAmp: false,
      isLive: true,
      originExample: 'https://www.bbc.com',
      urlExample: 'https://www.bbc.com/pidgin',
      childSrcExpectation: ["'self'"],
      connectSrcExpectation: [
        'https://*.akamaihd.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://config.api.bbci.co.uk',
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.api.bbc.co.uk',
        'https://www.bbc.co.uk',
        'https://news.files.bbci.co.uk',
        'https://mybbc-analytics.files.bbci.co.uk',
        "'self'",
      ],
      defaultSrcExpectation: ["'self'"],
      fontSrcExpectation: [
        'https://gel.files.bbci.co.uk',
        'https://ws-downloads.files.bbci.co.uk',
        'https://static.bbci.co.uk',
      ],
      frameSrcExpectation: [
        'https://polling.bbc.co.uk',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://emp.bbc.com',
        'https://emp.bbc.co.uk',
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://www.youtube.com',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://syndication.twitter.com',
        'https://news.files.bbci.co.uk',
        'https://www.bbc.co.uk',
        'https://bbc-maps.carto.com',
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://news.files.bbci.co.uk',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://syndication.twitter.com',
        'https://platform.twitter.com',
        'https://pbs.twimg.com',
        'https://i.ytimg.com',
        'https://ton.twimg.com',
        'https://news.bbcimg.co.uk',
        'https://static.bbc.co.uk',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://*.chartbeat.com',
        'https://mybbc-analytics.files.bbci.co.uk',
        'https://emp.bbci.co.uk',
        'https://static.bbci.co.uk',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'http://www.instagram.com',
        'https://cdn.syndication.twimg.com',
        'https://static.bbc.co.uk',
        'https://www.bbc.co.uk',
        'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js',
        'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js',
        'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://platform.twitter.com',
        'https://ton.twimg.com',
        'https://news.files.bbci.co.uk',
        'https://static.bbc.co.uk',
        "'unsafe-inline'",
      ],
      workerSrcExpectation: ["'self'"],
    },
    {
      isAmp: true,
      isLive: false,
      originExample: 'https://www.test.bbc.com',
      urlExample: 'https://www.test.bbc.com/pidgin.amp',
      childSrcExpectation: ['blob:'],
      connectSrcExpectation: [
        'https://*.akamaihd.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://cdn.ampproject.org',
        'https://*.ampproject.net',
        'https://amp-error-reporting.appspot.com',
        'https://logws1363.ati-host.net',
        'https://config.test.api.bbci.co.uk',
        'https://www.bbc.co.uk',
        'https://platform.twitter.com',
        'https://mybbc-analytics.files.bbci.co.uk',
        "'self'",
      ],
      defaultSrcExpectation: ["'self'"],
      fontSrcExpectation: [
        'https://gel.files.bbci.co.uk',
        'https://ws-downloads.files.bbci.co.uk',
      ],
      frameSrcExpectation: [
        'https://polling.bbc.co.uk',
        'https://polling.test.bbc.co.uk',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.youtube.com',
        'https://www.instagram.com',
        'https://*.ampproject.net',
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ichef.test.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://logws1363.ati-host.net',
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://sb.scorecardresearch.com',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'http://b.files.bbci.co.uk',
        'http://ping.chartbeat.net',
        'https://i.ytimg.com',
        'https://www.instagram.com',
        'https://*.cdninstagram.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://platform.twitter.com',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: ['https://news.files.bbci.co.uk', "'unsafe-inline'"],
      workerSrcExpectation: ['blob:'],
    },
    {
      isAmp: false,
      isLive: false,
      originExample: 'https://www.test.bbc.com',
      urlExample: 'https://www.test.bbc.com/pidgin',
      childSrcExpectation: ["'self'"],
      connectSrcExpectation: [
        'https://*.akamaihd.net',
        'https://logws1363.ati-host.net',
        'https://config.test.api.bbci.co.uk',
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.com',
        'https://cookie-oven.test.api.bbc.co.uk',
        'https://www.bbc.co.uk',
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://csi.gstatic.com',
        'https://experience.tinypass.com',
        'https://static.test.files.bbci.co.uk',
        'https://survey.effectivemeasure.net',
        'https://detect-survey.effectivemeasure.net',
        'https://collector.effectivemeasure.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://mybbc-analytics.files.bbci.co.uk',
        "'self'",
      ],
      defaultSrcExpectation: [
        'https://*.safeframe.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        "'self'",
      ],
      fontSrcExpectation: [
        'https://gel.files.bbci.co.uk',
        'https://ws-downloads.files.bbci.co.uk',
        'https://static.bbci.co.uk',
      ],
      frameSrcExpectation: [
        'https://polling.bbc.co.uk',
        'https://polling.test.bbc.co.uk',
        'https://emp.bbc.com',
        'https://emp.bbc.co.uk',
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        'https://www.youtube.com',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'https://syndication.twitter.com',
        'https://news.files.bbci.co.uk',
        'https://www.bbc.co.uk',
        'http://www.bbc.co.uk',
        'https://bbc-maps.carto.com',
        'https://bcp.crwdcntrl.net',
        'https://edigitalsurvey.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://news.test.files.bbci.co.uk',
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ichef.test.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://logws1363.ati-host.net',
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'http://b.files.bbci.co.uk',
        'http://ping.chartbeat.net',
        'https://syndication.twitter.com',
        'https://platform.twitter.com',
        'https://pbs.twimg.com',
        'https://i.ytimg.com',
        'https://ton.twimg.com',
        'https://news.bbcimg.co.uk',
        'https://static.bbc.co.uk',
        'http://static.bbc.co.uk',
        'https://collector.effectivemeasure.net',
        'https://csi.gstatic.com',
        'https://sb.scorecardresearch.com',
        'https://secure-us.imrworldwide.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://*.chartbeat.com',
        'https://mybbc-analytics.files.bbci.co.uk',
        'https://emp.bbci.co.uk',
        'https://static.bbci.co.uk',
        'http://*.chartbeat.com',
        'http://localhost:1124',
        'https://platform.twitter.com',
        'https://www.instagram.com',
        'http://www.instagram.com',
        'https://cdn.syndication.twimg.com',
        'https://static.bbc.co.uk',
        'http://static.bbc.co.uk',
        'https://www.bbc.co.uk',
        'https://passport-control.int.tools.bbc.co.uk/bookmarkletScript.js',
        'https://passport-control.test.tools.bbc.co.uk/bookmarkletScript.js',
        'https://passport-control.tools.bbc.co.uk/bookmarkletScript.js',
        'https://ad.crwdcntrl.net',
        'https://adservice.google.co.uk',
        'https://adservice.google.com',
        'https://bbc.gscontxt.net',
        'https://bcp.crwdcntrl.net',
        'https://cdn.ampproject.org',
        'https://collector.effectivemeasure.net',
        'https://me-ssl.effectivemeasure.net',
        'https://privacy.crwdcntrl.net',
        'https://sb.scorecardresearch.com',
        'https://securepubads.g.doubleclick.net',
        'https://t.effectivemeasure.net',
        'https://tags.crwdcntrl.net',
        'https://tpc.googlesyndication.com',
        'https://gn-web-assets.api.bbc.com',
        'https://www.googletagservices.com',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://platform.twitter.com',
        'https://ton.twimg.com',
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://static.bbc.co.uk',
        'http://static.bbc.co.uk',
        "'unsafe-inline'",
      ],
      workerSrcExpectation: ["'self'"],
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
      workerSrcExpectation,
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
          expect(generateFontSrc({ isAmp })).toEqual(fontSrcExpectation);
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

        it(`Then it has this workerSrc`, () => {
          expect(generateWorkerSrc({ isAmp })).toEqual(workerSrcExpectation);
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
            `default-src ${defaultSrcExpectation.join(' ')}; ` +
            `child-src ${childSrcExpectation.join(' ')}; ` +
            `connect-src ${connectSrcExpectation.join(' ')}; ` +
            `font-src ${fontSrcExpectation.join(' ')}; ` +
            `frame-src ${frameSrcExpectation.join(' ')}; ` +
            `img-src ${imgSrcExpectation.join(' ')}; ` +
            `script-src ${scriptSrcExpectation.join(' ')}; ` +
            `style-src ${styleSrcExpectation.join(' ')}; ` +
            `worker-src ${workerSrcExpectation.join(' ')}; ` +
            `report-to default; ` +
            `upgrade-insecure-requests`;

          expect(headers['Content-Security-Policy']).toEqual(
            expectedCSPHeaderString,
          );
        });
      });
    },
  );
});
