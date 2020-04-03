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
        'https://*.akstat.io',
        'https://*.akamaihd.net',
        'https://c.go-mpulse.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
        'https://www.bbc.co.uk',
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
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://news.files.bbci.co.uk',
        'https://*.akstat.io',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://via.placeholder.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://*.go-mpulse.net',
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
        'https://*.akstat.io',
        'https://*.akamaihd.net',
        'https://c.go-mpulse.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.api.bbc.co.uk',
        'https://www.bbc.co.uk',
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
        'https://emp.bbc.com',
        'https://emp.bbc.co.uk',
        'https://chartbeat.com',
        'https://*.chartbeat.com',
        "'self'",
      ],
      imgSrcExpectation: [
        'https://ichef.bbci.co.uk',
        'https://ping.chartbeat.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://news.files.bbci.co.uk',
        'https://*.akstat.io',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://via.placeholder.com',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://*.chartbeat.com',
        'https://*.go-mpulse.net',
        'https://mybbc-analytics.files.bbci.co.uk',
        'https://emp.bbci.co.uk',
        'https://static.bbci.co.uk',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: ['https://news.files.bbci.co.uk', "'unsafe-inline'"],
      workerSrcExpectation: ["'self'"],
    },
    {
      isAmp: true,
      isLive: false,
      originExample: 'https://www.test.bbc.com',
      urlExample: 'https://www.test.bbc.com/pidgin.amp',
      childSrcExpectation: ['blob:'],
      connectSrcExpectation: [
        'https://*.akstat.io',
        'https://*.akamaihd.net',
        'https://c.go-mpulse.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        'https://www.bbc.co.uk',
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
        'https://*.akstat.io',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://via.placeholder.com',
        'http://b.files.bbci.co.uk',
        'http://ping.chartbeat.net',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://*.chartbeat.com',
        'https://*.go-mpulse.net',
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
        'https://*.akstat.io',
        'https://*.akamaihd.net',
        'https://c.go-mpulse.net',
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.com',
        'https://cookie-oven.test.api.bbc.co.uk',
        'https://www.bbc.co.uk',
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
        'https://emp.bbc.com',
        'https://emp.bbc.co.uk',
        'https://chartbeat.com',
        'https://*.chartbeat.com',
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
        'https://*.akstat.io',
        'https://r.bbci.co.uk',
        'https://pagead2.googlesyndication.com',
        'https://securepubads.g.doubleclick.net',
        'https://tpc.googlesyndication.com',
        'https://www.google.com',
        'https://via.placeholder.com',
        'http://b.files.bbci.co.uk',
        'http://ping.chartbeat.net',
        "data: 'self'",
      ],
      scriptSrcExpectation: [
        'https://news.files.bbci.co.uk',
        'https://news.test.files.bbci.co.uk',
        'https://*.chartbeat.com',
        'https://*.go-mpulse.net',
        'https://mybbc-analytics.files.bbci.co.uk',
        'https://emp.bbci.co.uk',
        'https://static.bbci.co.uk',
        'http://*.chartbeat.com',
        'http://localhost:1124',
        "'self'",
        "'unsafe-inline'",
      ],
      styleSrcExpectation: ['https://news.files.bbci.co.uk', "'unsafe-inline'"],
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
          expect(generateDefaultSrc()).toEqual(defaultSrcExpectation);
        });

        it(`Then it has this fontSrc`, () => {
          expect(generateFontSrc()).toEqual(fontSrcExpectation);
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
          expect(generateStyleSrc({})).toEqual(styleSrcExpectation);
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
            `worker-src ${workerSrcExpectation.join(' ')}`;

          expect(headers['Content-Security-Policy']).toEqual(
            expectedCSPHeaderString,
          );
        });
      });
    },
  );
});
