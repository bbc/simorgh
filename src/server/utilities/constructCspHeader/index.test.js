import injectCspHeader, {
  generateScriptSrc,
  generateImgSrc,
  generateConnectSrc,
  generateCspContext,
} from './index';

const next = jest.fn();

const testAmpScript = context => {
  const expected = [
    'https://cdn.ampproject.org',
    'https://*.chartbeat.com',
    'https://*.go-mpulse.net',
    "'unsafe-inline'",
  ];
  const result = generateScriptSrc(context);

  expect(result).toEqual(expected);
};

const connectCommon = [
  'https://*.akstat.io',
  'https://*.akamaihd.net',
  'https://c.go-mpulse.net',
];

const testConnect = (additional, context) => {
  const expected = connectCommon.concat(additional);
  const result = generateConnectSrc(context);

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

  it('should be able to generate the default live canon script src', () => {
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
    const context = generateCspContext(false, true, true);
    const result = generateScriptSrc(context);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default test cannon script src', () => {
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
    const context = generateCspContext(false, true, false);
    const result = generateScriptSrc(context);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default live amp script src', () => {
    const context = generateCspContext(true, true, true);
    testAmpScript(context);
  });

  it('should be able to generate the default test amp script src', () => {
    const context = generateCspContext(true, true, false);
    testAmpScript(context);
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
    const context = generateCspContext(false, true, true);
    const result = generateImgSrc(context);

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
    const context = generateCspContext(false, true, false);
    const result = generateImgSrc(context);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the live connect src when in the uk on cannonical', () => {
    const context = generateCspContext(false, true, true);
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
      ],
      context,
    );
  });

  it('should be able to generate the test connect src when in the uk on cannonical', () => {
    const context = generateCspContext(false, true, false);
    testConnect(
      [
        'https://logws1363.ati-host.net',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.co.uk',
      ],
      context,
    );
  });

  it('should be able to generate the live connect src when not in the uk on cannonical', () => {
    const context = generateCspContext(false, false, true);
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        "'self'",
        'https://cookie-oven.api.bbc.com',
      ],
      context,
    );
  });

  it('should be able to generate the test connect src when not in the uk on cannonical', () => {
    const context = generateCspContext(false, false, false);
    testConnect(
      [
        'https://logws1363.ati-host.net',
        "'self'",
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.test.api.bbc.com',
      ],
      context,
    );
  });

  it('should be able to generate the test connect src when not in the uk on amp', () => {
    const context = generateCspContext(true, false, false);
    testConnect(
      [
        'https://logws1363.ati-host.net',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
      context,
    );
  });

  it('should be able to generate the live connect src when not in the uk on amp', () => {
    const context = generateCspContext(true, false, true);
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
      context,
    );
  });

  it('should be able to generate the test connect src when in the uk on amp', () => {
    const context = generateCspContext(true, true, false);
    testConnect(
      [
        'https://logws1363.ati-host.net',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
      context,
    );
  });

  it('should be able to generate the live connect src when in the uk on amp', () => {
    const context = generateCspContext(true, true, true);
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cdn.ampproject.org',
        'https://amp-error-reporting.appspot.com',
      ],
      context,
    );
  });
});

describe('CSP Header Middleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to inject the csp header for live in the uk on cannon', () => {
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

  it('should be able to inject the csp header for live outside the uk on cannon', () => {
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

  it('should be able to inject the csp header for test in the uk on cannon', () => {
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

  it('should be able to inject the csp header for test in the uk on cannon', () => {
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
