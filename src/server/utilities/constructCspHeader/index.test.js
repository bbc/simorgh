import { generateScriptSrc, generateImgSrc, generateConnectSrc } from './index';

describe('Construct CSP Header', () => {
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

  it('should be able to generate the live connect src when in the uk', async () => {
    const expected = [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      "'self'",
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://cookie-oven.api.bbc.co.uk',
    ];
    const result = generateConnectSrc(false, true, true);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the test connect src when in the uk', async () => {
    const expected = [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      "'self'",
      'https://logws1363.ati-host.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://cookie-oven.api.bbc.co.uk',
      'https://cookie-oven.test.api.bbc.co.uk',
    ];
    const result = generateConnectSrc(false, true, false);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the live connect src when not in the uk', async () => {
    const expected = [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      "'self'",
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://cookie-oven.api.bbc.com',
    ];
    const result = generateConnectSrc(false, false, true);

    expect(result).toEqual(expected);
  });

  it('should be able to generate the test connect src when not in the uk', async () => {
    const expected = [
      'https://*.akstat.io',
      'https://*.akamaihd.net',
      'https://c.go-mpulse.net',
      "'self'",
      'https://logws1363.ati-host.net',
      'https://a1.api.bbc.co.uk/hit.xiti',
      'https://cookie-oven.api.bbc.com',
      'https://cookie-oven.test.api.bbc.com',
    ];
    const result = generateConnectSrc(false, false, false);

    expect(result).toEqual(expected);
  });
});
