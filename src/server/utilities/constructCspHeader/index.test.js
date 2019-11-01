import injectCspHeader, {
  generateScriptSrc,
  generateImgSrc,
  generateConnectSrc,
} from './index';

const next = jest.fn();

const testAmpScript = (isAmp, isLive) => {
  const expected = [
    'https://cdn.ampproject.org',
    'https://*.chartbeat.com',
    'https://*.go-mpulse.net',
    "'unsafe-inline'",
  ];
  const result = generateScriptSrc(isAmp, isLive);

  expect(result).toEqual(expected);
};

const connectCommon = [
  'https://*.akstat.io',
  'https://*.akamaihd.net',
  'https://c.go-mpulse.net',
];

const testConnect = (additional, isAmp, isUk, isLive) => {
  const expected = connectCommon.concat(additional);
  const result = generateConnectSrc(isAmp, isUk, isLive);

  expect(result).toEqual(expected);
};

const testMiddleware = (origin, path, cspString) => {
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

  it('should be able to generate the default live canon script src', async () => {
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
    const result = generateScriptSrc(false, true);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default test cannon script src', async () => {
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
    const result = generateScriptSrc(false, false);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the default live amp script src', async () => {
    testAmpScript(true, true);
  });

  it('should be able to generate the default test amp script src', async () => {
    testAmpScript(true, false);
  });

  it('should be able to generate the live img src', async () => {
    const expected = [
      'https://ichef.bbci.co.uk',
      'https://ping.chartbeat.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://news.files.bbci.co.uk',
      'https://*.akstat.io',
      'https://r.bbci.co.uk',
      "data: 'self'",
    ];
    const result = generateImgSrc(true);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the test img src', async () => {
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
    const result = generateImgSrc(false);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the live connect src when in the uk on cannonical', async () => {
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
      ],
      false,
      true,
      true,
    );
  });

  it('should be able to generate the test connect src when in the uk on cannonical', async () => {
    testConnect(
      [
        'https://logws1363.ati-host.net',
        "'self'",
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.co.uk',
      ],
      false,
      true,
      false,
    );
  });

  it('should be able to generate the live connect src when not in the uk on cannonical', async () => {
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        "'self'",
        'https://cookie-oven.api.bbc.com',
      ],
      false,
      false,
      true,
    );
  });

  it('should be able to generate the test connect src when not in the uk on cannonical', async () => {
    testConnect(
      [
        'https://logws1363.ati-host.net',
        "'self'",
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.test.api.bbc.com',
      ],
      false,
      false,
      false,
    );
  });

  it('should be able to generate the test connect src when not in the uk on amp', async () => {
    testConnect(['https://logws1363.ati-host.net'], true, false, false);
  });

  it('should be able to generate the live connect src when not in the uk on amp', async () => {
    testConnect(['https://a1.api.bbc.co.uk/hit.xiti'], true, false, true);
  });

  it('should be able to generate the test connect src when in the uk on amp', async () => {
    testConnect(['https://logws1363.ati-host.net'], true, true, false);
  });

  it('should be able to generate the live connect src when in the uk on amp', async () => {
    testConnect(['https://a1.api.bbc.co.uk/hit.xiti'], true, true, true);
  });
});

describe('CSP Header Middleware', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to inject the csp header for live in the uk on cannon', async () => {
    testMiddleware(
      'https://bbc.co.uk',
      '/igbo',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.co.uk; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for live in the uk on amp', async () => {
    testMiddleware(
      'https://bbc.co.uk',
      '/igbo.amp',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for live outside the uk on cannon', async () => {
    testMiddleware(
      'https://bbc.com',
      '/igbo',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti 'self' https://cookie-oven.api.bbc.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for live outside the uk on amp', async () => {
    testMiddleware(
      'https://bbc.com',
      '/igbo.amp',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://a1.api.bbc.co.uk/hit.xiti; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for test in the uk on cannon', async () => {
    testMiddleware(
      'https://www.test.bbc.co.uk',
      '/igbo',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.co.uk https://cookie-oven.test.api.bbc.co.uk; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for test in the uk on amp', async () => {
    testMiddleware(
      'https://www.test.bbc.co.uk',
      '/igbo.amp',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for test in the uk on cannon', async () => {
    testMiddleware(
      'https://www.test.bbc.com',
      '/igbo',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline' https://news.test.files.bbci.co.uk; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net 'self' https://cookie-oven.api.bbc.com https://cookie-oven.test.api.bbc.com; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });

  it('should be able to inject the csp header for test in the uk on amp', async () => {
    testMiddleware(
      'https://www.test.bbc.com',
      '/igbo.amp',
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk https://ichef.test.bbci.co.uk https://news.test.files.bbci.co.uk https://logws1363.ati-host.net data: 'self'; script-src https://cdn.ampproject.org https://*.chartbeat.com https://*.go-mpulse.net 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://logws1363.ati-host.net; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });
});
