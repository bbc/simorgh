import injectCspHeader, {
  generateScriptSrc,
  generateImgSrc,
  generateConnectSrc,
  stringCspHeader,
} from '.';

const next = jest.fn();

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

const testMiddleware = ({ origin, path, cspString }) => {
  const req = {
    url: origin + path,
    headers: {
      'user-agent': 'local-agent',
      'bbc-origin': origin,
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

  expect(headers['Content-Security-Policy']).toEqual(cspString);
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
      'https://ichef.test.bbci.co.uk',
      'https://news.test.files.bbci.co.uk',
      'https://logws1363.ati-host.net',
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
        'https://a1.api.bbc.co.uk/hit.xiti',
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
        'https://logws1363.ati-host.net',
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
        'https://a1.api.bbc.co.uk/hit.xiti',
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
        'https://logws1363.ati-host.net',
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
        'https://logws1363.ati-host.net',
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
        'https://a1.api.bbc.co.uk/hit.xiti',
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
        'https://logws1363.ati-host.net',
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
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
    });
  });
});

describe('CSP Header Middleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to inject the csp header for live in the uk on canonical', () => {
    testMiddleware({
      origin: 'https://bbc.co.uk',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.co.uk; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for live in the uk on amp', () => {
    testMiddleware({
      origin: 'https://bbc.co.uk',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for live outside the uk on canonical', () => {
    testMiddleware({
      origin: 'https://bbc.com',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for live outside the uk on amp', () => {
    testMiddleware({
      origin: 'https://bbc.com',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for test in the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.co.uk',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.co.uk https://cookie-oven.test.api.bbc.co.uk; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for test in the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.co.uk',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src blob:; child-src blob:",
    });
  });

  it('should be able to inject the csp header for test in the uk on canonical', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.com',
      path: '/igbo',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.com https://cookie-oven.test.api.bbc.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src 'self'; child-src 'self'",
    });
  });

  it('should be able to inject the csp header for test in the uk on amp', () => {
    testMiddleware({
      origin: 'https://www.test.bbc.com',
      path: '/igbo.amp',
      cspString:
        "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src blob:; child-src blob:",
    });
  });
});

describe('stringCspHeader', () => {
  [
    {
      description:
        'should return csp string for AMP when on Test and in the UK',
      isAmp: true,
      isLive: false,
      isUK: true,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src: https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: blob:; child-src: blob:`,
    },
    {
      description:
        'should return csp string for AMP when on Live and in the UK',
      isAmp: true,
      isLive: true,
      isUK: true,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src: https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: blob:; child-src: blob:`,
    },
    {
      description:
        'should return csp string for Canonical when on Test and in the UK',
      isAmp: false,
      isLive: false,
      isUK: true,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src: https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.co.uk https://cookie-oven.test.api.bbc.co.uk; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: 'self'; child-src: 'self'`,
    },
    {
      description:
        'should return csp string for Canonical when on Live and in the UK',
      isAmp: false,
      isLive: true,
      isUK: true,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src: https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.co.uk; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: 'self'; child-src: 'self'`,
    },
    {
      description:
        'should return csp string for AMP when on Test and outside the UK',
      isAmp: true,
      isLive: false,
      isUK: false,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src: https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: blob:; child-src: blob:`,
    },
    {
      description:
        'should return csp string for AMP when on Live and outside the UK',
      isAmp: true,
      isLive: true,
      isUK: false,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src: https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti https://cdn.ampproject.org https://amp-error-reporting.appspot.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: blob:; child-src: blob:`,
    },
    {
      description:
        'should return csp string for Canonical when on Test and outside the UK',
      isAmp: false,
      isLive: false,
      isUK: false,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src: https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.com https://cookie-oven.test.api.bbc.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: 'self'; child-src: 'self'`,
    },
    {
      description:
        'should return csp string for Canonical when on Live and outside the UK',
      isAmp: false,
      isLive: true,
      isUK: false,
      expectation: `default-src: 'self'; font-src: https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src: 'unsafe-inline'; img-src: https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src: https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src: https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.com; frame-src: 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com; worker-src: 'self'; child-src: 'self'`,
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
        const result = stringCspHeader({
          isAmp,
          isLive,
          isUK,
        });

        expect(result).toEqual(expectation);
      });
    },
  );
});
