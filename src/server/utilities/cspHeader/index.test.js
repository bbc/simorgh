import {
  generateScriptSrc,
  generateImgSrc,
  generateConnectSrc,
  constructCspHeader,
} from '.';

const testAmpScript = ({ isAmp, isLive, isUK }) => {
  const expected = [
    'https://cdn.ampproject.org',
    'https://*.chartbeat.com',
    'https://*.go-mpulse.net',
    "'unsafe-inline'",
  ];
  const result = generateScriptSrc({ isAmp, isLive, isUK });

  expect(result).toEqual(expected);
};

const connectCommon = [
  'https://*.akstat.io',
  'https://*.akamaihd.net',
  'https://c.go-mpulse.net',
];

const testConnect = ({ isAmp, isLive, isUK, additional }) => {
  const expected = connectCommon.concat(additional);
  const result = generateConnectSrc({ isAmp, isLive, isUK });

  expect(result).toEqual(expected);
};

describe('Construct CSP Header', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to generate the default live canonical script src', () => {
    const expected = [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      "'self'",
      "'unsafe-inline'",
    ];
    const result = generateScriptSrc({
      isAmp: false,
      isLive: true,
      isUK: true,
    });

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default test canonical script src', () => {
    const expected = [
      'https://news.files.bbci.co.uk',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      'https://mybbc-analytics.files.bbci.co.uk',
      'https://emp.bbci.co.uk',
      'https://static.bbci.co.uk',
      "'self'",
      "'unsafe-inline'",
      'https://news.test.files.bbci.co.uk',
      'http://*.chartbeat.com',
      'http://localhost:1124',
    ];
    const result = generateScriptSrc({
      isAmp: false,
      isLive: false,
      isUK: true,
    });

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default live amp script src', () => {
    testAmpScript({
      isAmp: true,
      isLive: true,
      isUK: true,
    });
  });

  it('should be able to generate the default test amp script src', () => {
    testAmpScript({
      isAmp: true,
      isLive: false,
      isUK: true,
    });
  });

  it('should be able to generate the live img src', () => {
    const expected = [
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
    ];
    const result = generateImgSrc({
      isAmp: false,
      isLive: true,
      isUK: true,
    });

    expect(result).toEqual(expected);
  });

  it('should be able to generate the test img src', () => {
    const expected = [
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
      'https://ichef.test.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://logws1363.ati-host.net',
      'http://b.files.bbci.co.uk',
      'http://ping.chartbeat.net',
      "data: 'self'",
    ];
    const result = generateImgSrc({
      isAmp: false,
      isLive: false,
      isUK: true,
    });

    expect(result).toEqual(expected);
  });

  it('should be able to generate the live connect src when in the uk on canonical', () => {
    testConnect({
      isAmp: false,
      isLive: true,
      isUK: true,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
      ],
    });
  });

  it('should be able to generate the test connect src when in the uk on canonical', () => {
    testConnect({
      isAmp: false,
      isLive: false,
      isUK: true,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.co.uk',
      ],
    });
  });

  it('should be able to generate the live connect src when not in the uk on canonical', () => {
    testConnect({
      isAmp: false,
      isLive: true,
      isUK: false,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        "'self'",
        'https://cookie-oven.api.bbc.com',
      ],
    });
  });

  it('should be able to generate the test connect src when not in the uk on canonical', () => {
    testConnect({
      isAmp: false,
      isLive: false,
      isUK: false,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        "'self'",
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.test.api.bbc.com',
      ],
    });
  });

  it('should be able to generate the test connect src when not in the uk on amp', () => {
    testConnect({
      isAmp: true,
      isLive: false,
      isUK: false,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
    });
  });

  it('should be able to generate the live connect src when not in the uk on amp', () => {
    testConnect({
      isAmp: true,
      isLive: true,
      isUK: false,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
    });
  });

  it('should be able to generate the test connect src when in the uk on amp', () => {
    testConnect({
      isAmp: true,
      isLive: false,
      isUK: true,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://logws1363.ati-host.net',
        'https://toggles.test.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
    });
  });

  it('should be able to generate the live connect src when in the uk on amp', () => {
    testConnect({
      isAmp: true,
      isLive: true,
      isUK: true,
      additional: [
        'https://adservice.google.com',
        'https://securepubads.g.doubleclick.net',
        'https://pagead2.googlesyndication.com',
        'https://tpc.googlesyndication.com',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://toggles.api.bbci.co.uk',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
    });
  });
});

describe('constructCspHeader', () => {
  [
    {
      description:
        'should return csp string for AMP when on Test and in the UK',
      isAmp: true,
      isLive: false,
      isUK: true,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["blob:"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://logws1363.ati-host.net", "https://toggles.test.api.bbci.co.uk", "https://cdn.ampproject.org", "https://amp-error-reporting.appspot.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://polling.test.bbc.co.uk"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "https://ichef.test.bbci.co.uk", "https://news.test.files.bbci.co.uk", "https://logws1363.ati-host.net", "http://b.files.bbci.co.uk", "http://ping.chartbeat.net", "data: 'self'"], "script-src": ["https://cdn.ampproject.org", "https://*.chartbeat.com", "https://*.go-mpulse.net", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["blob:"]}}`,
      ),
    },
    {
      description:
        'should return csp string for AMP when on Live and in the UK',
      isAmp: true,
      isLive: true,
      isUK: true,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["blob:"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://a1.api.bbc.co.uk/hit.xiti", "https://toggles.api.bbci.co.uk", "https://cdn.ampproject.org", "https://amp-error-reporting.appspot.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "data: 'self'"], "script-src": ["https://cdn.ampproject.org", "https://*.chartbeat.com", "https://*.go-mpulse.net", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["blob:"]}}`,
      ),
    },
    {
      description:
        'should return csp string for Canonical when on Test and in the UK',
      isAmp: false,
      isLive: false,
      isUK: true,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["'self'"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://logws1363.ati-host.net", "https://toggles.test.api.bbci.co.uk", "'self'", "https://cookie-oven.api.bbc.co.uk", "https://cookie-oven.test.api.bbc.co.uk"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://emp.bbc.com", "https://emp.bbc.co.uk", "https://chartbeat.com", "https://*.chartbeat.com", "https://polling.test.bbc.co.uk"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "https://ichef.test.bbci.co.uk", "https://news.test.files.bbci.co.uk", "https://logws1363.ati-host.net", "http://b.files.bbci.co.uk", "http://ping.chartbeat.net", "data: 'self'"], "script-src": ["https://news.files.bbci.co.uk", "https://*.chartbeat.com", "https://*.go-mpulse.net", "https://mybbc-analytics.files.bbci.co.uk", "https://emp.bbci.co.uk", "https://static.bbci.co.uk", "'self'", "'unsafe-inline'", "https://news.test.files.bbci.co.uk", "http://*.chartbeat.com", "http://localhost:1124"], "style-src": ["'unsafe-inline'"], "worker-src": ["'self'"]}}`,
      ),
    },
    {
      description:
        'should return csp string for Canonical when on Live and in the UK',
      isAmp: false,
      isLive: true,
      isUK: true,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["'self'"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://a1.api.bbc.co.uk/hit.xiti", "https://toggles.api.bbci.co.uk", "'self'", "https://cookie-oven.api.bbc.co.uk"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://emp.bbc.com", "https://emp.bbc.co.uk", "https://chartbeat.com", "https://*.chartbeat.com"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "data: 'self'"], "script-src": ["https://news.files.bbci.co.uk", "https://*.chartbeat.com", "https://*.go-mpulse.net", "https://mybbc-analytics.files.bbci.co.uk", "https://emp.bbci.co.uk", "https://static.bbci.co.uk", "'self'", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["'self'"]}}`,
      ),
    },
    {
      description:
        'should return csp string for AMP when on Test and outside the UK',
      isAmp: true,
      isLive: false,
      isUK: false,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["blob:"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://logws1363.ati-host.net", "https://toggles.test.api.bbci.co.uk", "https://cdn.ampproject.org", "https://amp-error-reporting.appspot.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://polling.test.bbc.co.uk"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "https://ichef.test.bbci.co.uk", "https://news.test.files.bbci.co.uk", "https://logws1363.ati-host.net", "http://b.files.bbci.co.uk", "http://ping.chartbeat.net", "data: 'self'"], "script-src": ["https://cdn.ampproject.org", "https://*.chartbeat.com", "https://*.go-mpulse.net", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["blob:"]}}`,
      ),
    },
    {
      description:
        'should return csp string for AMP when on Live and outside the UK',
      isAmp: true,
      isLive: true,
      isUK: false,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["blob:"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://a1.api.bbc.co.uk/hit.xiti", "https://toggles.api.bbci.co.uk", "https://cdn.ampproject.org", "https://amp-error-reporting.appspot.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "data: 'self'"], "script-src": ["https://cdn.ampproject.org", "https://*.chartbeat.com", "https://*.go-mpulse.net", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["blob:"]}}`,
      ),
    },
    {
      description:
        'should return csp string for Canonical when on Test and outside the UK',
      isAmp: false,
      isLive: false,
      isUK: false,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["'self'"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://logws1363.ati-host.net", "https://toggles.test.api.bbci.co.uk", "'self'", "https://cookie-oven.api.bbc.com", "https://cookie-oven.test.api.bbc.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://emp.bbc.com", "https://emp.bbc.co.uk", "https://chartbeat.com", "https://*.chartbeat.com", "https://polling.test.bbc.co.uk"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "https://ichef.test.bbci.co.uk", "https://news.test.files.bbci.co.uk", "https://logws1363.ati-host.net", "http://b.files.bbci.co.uk", "http://ping.chartbeat.net", "data: 'self'"], "script-src": ["https://news.files.bbci.co.uk", "https://*.chartbeat.com", "https://*.go-mpulse.net", "https://mybbc-analytics.files.bbci.co.uk", "https://emp.bbci.co.uk", "https://static.bbci.co.uk", "'self'", "'unsafe-inline'", "https://news.test.files.bbci.co.uk", "http://*.chartbeat.com", "http://localhost:1124"], "style-src": ["'unsafe-inline'"], "worker-src": ["'self'"]}}`,
      ),
    },
    {
      description:
        'should return csp string for Canonical when on Live and outside the UK',
      isAmp: false,
      isLive: true,
      isUK: false,
      expectation: JSON.parse(
        `{"directives": {"child-src": ["'self'"], "connect-src": ["https://*.akstat.io", "https://*.akamaihd.net", "https://c.go-mpulse.net", "https://adservice.google.com", "https://securepubads.g.doubleclick.net", "https://pagead2.googlesyndication.com", "https://tpc.googlesyndication.com", "https://a1.api.bbc.co.uk/hit.xiti", "https://toggles.api.bbci.co.uk", "'self'", "https://cookie-oven.api.bbc.com"], "default-src": ["'self'"], "font-src": ["https://gel.files.bbci.co.uk", "https://ws-downloads.files.bbci.co.uk"], "frame-src": ["'self'", "https://polling.bbc.co.uk", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://emp.bbc.com", "https://emp.bbc.co.uk", "https://chartbeat.com", "https://*.chartbeat.com"], "img-src": ["https://ichef.bbci.co.uk", "https://ping.chartbeat.net", "https://a1.api.bbc.co.uk/hit.xiti", "https://news.files.bbci.co.uk", "https://*.akstat.io", "https://r.bbci.co.uk", "https://pagead2.googlesyndication.com", "https://securepubads.g.doubleclick.net", "https://tpc.googlesyndication.com", "https://www.google.com", "https://via.placeholder.com", "data: 'self'"], "script-src": ["https://news.files.bbci.co.uk", "https://*.chartbeat.com", "https://*.go-mpulse.net", "https://mybbc-analytics.files.bbci.co.uk", "https://emp.bbci.co.uk", "https://static.bbci.co.uk", "'self'", "'unsafe-inline'"], "style-src": ["'unsafe-inline'"], "worker-src": ["'self'"]}}`,
      ),
    },
  ].forEach(
    ({
      isAmp,
      isLive,
      isUK,
      description,

      expectation,
    }) => {
      it(description, () => {
        const result = constructCspHeader({
          isAmp,
          isLive,
          isUK,
        });

        expect(result).toEqual(expectation);
      });
    },
  );
});
