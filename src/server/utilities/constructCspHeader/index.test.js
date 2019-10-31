import injectCspHeader, {
  generateScriptSrc,
  generateImgSrc,
  generateConnectSrc,
} from './index';

const req = {
  url: 'https://bbc.co.uk/igbo',
  headers: {
    'user-agent': 'local-agent',
    'bbc-origin': 'https://bbc.co.uk',
  },
};

const headers = {};

const res = {
  setHeader: (key, value) => {
    headers[key] = value;
  },
};

const next = jest.fn();

describe('Construct CSP Header', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to generate the default live script src', async () => {
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

  it('should be able to generate the default test script src', async () => {
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

  it('should be able to generate the amp script src', async () => {
    const expected = [
      'https://cdn.ampproject.org',
      'https://*.chartbeat.com',
      'https://*.go-mpulse.net',
      "'unsafe-inline'",
    ];
    const result = generateScriptSrc(true, true);

    expect(result).toEqual(expected);
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

  const connectCommon = [
    'https://*.akstat.io',
    'https://*.akamaihd.net',
    'https://c.go-mpulse.net',
    "'self'",
  ];

  const testConnect = (additional, isAmp, isUk, isLive) => {
    const expected = connectCommon.concat(additional);
    const result = generateConnectSrc(isAmp, isUk, isLive);

    expect(result).toEqual(expected);
  };

  it('should be able to generate the live connect src when in the uk', async () => {
    testConnect(
      [
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cookie-oven.api.bbc.co.uk',
      ],
      false,
      true,
      true,
    );
  });

  it('should be able to generate the test connect src when in the uk', async () => {
    testConnect(
      [
        'https://logws1363.ati-host.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cookie-oven.api.bbc.co.uk',
        'https://cookie-oven.test.api.bbc.co.uk',
      ],
      false,
      true,
      false,
    );
  });

  it('should be able to generate the live connect src when not in the uk', async () => {
    testConnect(
      ['https://a1.api.bbc.co.uk/hit.xiti', 'https://cookie-oven.api.bbc.com'],
      false,
      false,
      true,
    );
  });

  it('should be able to generate the test connect src when not in the uk', async () => {
    testConnect(
      [
        'https://logws1363.ati-host.net',
        'https://a1.api.bbc.co.uk/hit.xiti',
        'https://cookie-oven.api.bbc.com',
        'https://cookie-oven.test.api.bbc.com',
      ],
      false,
      false,
      false,
    );
  });

  it('should be able to inject the csp header', () => {
    injectCspHeader(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(headers['Content-Security-Policy']).toEqual(
      "default-src 'self'; font-src https://gel.files.bbci.co.uk https://ws-downloads.files.bbci.co.uk; style-src 'unsafe-inline'; img-src https://ichef.bbci.co.uk https://ping.chartbeat.net https://a1.api.bbc.co.uk/hit.xiti https://news.files.bbci.co.uk https://*.akstat.io https://r.bbci.co.uk data: 'self'; script-src https://news.files.bbci.co.uk https://*.chartbeat.com https://*.go-mpulse.net https://mybbc-analytics.files.bbci.co.uk https://emp.bbci.co.uk https://static.bbci.co.uk 'self' 'unsafe-inline'; connect-src https://*.akstat.io https://*.akamaihd.net https://c.go-mpulse.net https://cookie-oven.api.bbc.co.uk https://a1.api.bbc.co.uk/hit.xiti 'self'; frame-src 'self' https://emp.bbc.com https://emp.bbc.co.uk https://chartbeat.com https://*.chartbeat.com",
    );
  });
});
