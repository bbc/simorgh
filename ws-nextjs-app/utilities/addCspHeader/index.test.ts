import { NextPageContext } from 'next/types';
import addCspHeader from '.';

const MOCK_NONCE = 'mock-nonce';

jest.mock('#app/lib/utilities/getUUID', () => () => 'mock-nonce');

const createDocumentContext = (pathname: string) => {
  const url = new URL(`https://www.test.bbc.com${pathname}`);

  return {
    req: {
      url: url.pathname,
      headers: {},
    },
    res: {
      getHeader: jest.fn(),
      setHeader: jest.fn(),
    },
  } as unknown as NextPageContext;
};

const getCspHeader = (ctx: NextPageContext) =>
  (ctx.res?.setHeader as jest.Mock).mock.calls.find(
    call => call[0] === 'Content-Security-Policy',
  )?.[1];

const policies = [
  'default-src',
  'child-src',
  'connect-src',
  'font-src',
  'frame-src',
  'img-src',
  'script-src',
  'style-src',
  'media-src',
  'worker-src',
  'report-to',
  'upgrade-insecure-requests',
];

describe('addCspHeader', () => {
  const processEnv = process.env;

  beforeEach(() => {
    process.env = { ...processEnv, NODE_ENV: 'production' };
  });

  it.each(policies)('should set %s in the request CSP', policy => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({ ctx, service: 'pidgin', toggles: {}, country: 'gb' });

    expect((getCspHeader(ctx) as string).includes(policy)).toBe(true);
  });

  it('should not set CSP headers in non-production environments', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    process.env = { ...processEnv, NODE_ENV: 'development' };

    const { nonce, cspHeader } = addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {},
      country: 'gb',
    });

    expect(getCspHeader(ctx)).toBeUndefined();
    expect(nonce).toBeNull();
    expect(cspHeader).toBeNull();
  });
});

describe('CSP tiers', () => {
  const processEnv = process.env;

  beforeEach(() => {
    process.env = { ...processEnv, NODE_ENV: 'production' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedRelaxedCsp =
    "default-src  *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https:;child-src  blob: https: 'self';connect-src  'self' https: ws: wss:;font-src  https: data: blob: 'self';frame-src  https: data:;img-src  https: data: blob:;script-src  https: 'unsafe-inline' 'unsafe-eval' blob: data: 'self';style-src  https: 'unsafe-inline';media-src  'self' blob: data: https:;worker-src  blob: data: 'self' *.bbc.co.uk *.bbc.com;report-to  worldsvc;upgrade-insecure-requests;";

  const expectedFullCsp =
    "default-src  'self' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.googlesyndication.com;child-src  'self';connect-src  'self' https: ws: wss:;font-src  *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com data: https://*.teads.tv https://cdnjs.cloudflare.com/ajax/libs/font-awesome/ https://fonts.gstatic.com;frame-src  'self' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.amazon-adsystem.com https://*.chartbeat.com https://*.doubleclick.net https://*.facebook.com https://*.google.com https://*.googleadservices.com https://*.googlesyndication.com https://*.mapcreator.io https://*.teads.tv https://*.thomsonreuters.com https://*.twitter.com https://bbc-maps.carto.com https://bbc.com https://cdn.privacy-mgmt.com https://chartbeat.com https://edigitalsurvey.com https://flo.uri.sh https://public.flourish.studio https://www.instagram.com https://www.riddle.com https://www.tiktok.com https://www.youtube-nocookie.com https://www.youtube.com;img-src  *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com data: 'self' http://ping.chartbeat.net https://*.adsafeprotected.com https://*.amazon-adsystem.com https://*.cdninstagram.com https://*.doubleclick.net https://*.effectivemeasure.net https://*.google.com https://*.googlesyndication.com https://*.googleusercontent.com https://*.gstatic.com https://*.imrworldwide.com https://*.teads.tv https://*.tiktokcdn.com https://*.twimg.com https://*.twitter.com https://*.xx.fbcdn.net https://i.ytimg.com https://logw363.ati-host.net https://logws1363.ati-host.net https://ping.chartbeat.net https://sb.scorecardresearch.com https://www.googleadservices.com;script-src  'self' 'unsafe-eval' 'unsafe-inline' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com http://*.chartbeat.com http://localhost:1124 http://localhost:7080 https://*.adsafeprotected.com https://*.amazon-adsystem.com https://*.chartbeat.com https://*.covatic.io https://*.doubleverify.com https://*.effectivemeasure.net https://*.facebook.com https://*.g.doubleclick.net https://*.google.com https://*.googlesyndication.com https://*.imrworldwide.com https://*.mapcreator.io https://*.permutive.com https://*.teads.tv https://*.thomsonreuters.com https://*.twimg.com https://*.twitter.com https://*.webcontentassessor.com https://*.xx.fbcdn.net https://adservice.google.co.uk https://bbc.gscontxt.net https://cdn.ampproject.org https://cdn.privacy-mgmt.com https://connect.facebook.net https://lf16-tiktok-web.ttwstatic.com https://public.flourish.studio https://sb.scorecardresearch.com https://www.googletagservices.com https://www.instagram.com https://www.riddle.com https://www.tiktok.com;style-src  'unsafe-inline' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.twimg.com https://*.twitter.com https://*.xx.fbcdn.net https://fonts.googleapis.com https://lf16-tiktok-web.ttwstatic.com;media-src  'self' blob: https:;worker-src  blob: 'self' *.bbc.co.uk *.bbc.com;report-to  worldsvc;upgrade-insecure-requests;";

  it('returns the strict CSP by default when no CSP toggles are set', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({ ctx, service: 'pidgin', toggles: {}, country: 'gb' });

    expect(getCspHeader(ctx)).toEqual(expectedFullCsp);
  });

  it('returns the strict CSP when relaxedCsp is enabled but has no values set', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {
        relaxedCsp: { enabled: true, value: '' },
        adsNonce: { enabled: true, value: '' },
      },
      country: 'gb',
    });

    expect(getCspHeader(ctx)).toEqual(expectedFullCsp);
  });

  it('returns the strict CSP when the country is in neither allow list', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {
        relaxedCsp: { enabled: true, value: 'in' },
        adsNonce: { enabled: true, value: 'ke' },
      },
      country: 'gb',
    });

    expect(getCspHeader(ctx)).toEqual(expectedFullCsp);
  });

  it('returns the strict CSP when no country can be resolved', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: { relaxedCsp: { enabled: true, value: 'gb' } },
      country: null,
    });

    expect(getCspHeader(ctx)).toEqual(expectedFullCsp);
  });

  it('returns the relaxed CSP when the country is in the relaxedCsp allow list', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: { relaxedCsp: { enabled: true, value: 'in,br' } },
      country: 'in',
    });

    expect(getCspHeader(ctx)).toEqual(expectedRelaxedCsp);
  });

  it('adds the nonce to script-src when the country is in the adsNonce allow list', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    const { nonce } = addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: { adsNonce: { enabled: true, value: 'ke' } },
      country: 'ke',
    });

    expect(nonce).toBe(MOCK_NONCE);
    expect(getCspHeader(ctx)).toContain(`'nonce-${MOCK_NONCE}'`);
  });

  it('does not add a nonce on the strict or relaxed tiers', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    const { nonce } = addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: { relaxedCsp: { enabled: true, value: 'in' } },
      country: 'in',
    });

    expect(nonce).toBeNull();
    expect(getCspHeader(ctx)).not.toContain('nonce-');
  });

  it('returns the CSP header value that was set on the response', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    const { cspHeader } = addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {},
      country: 'gb',
    });

    expect(cspHeader).toEqual(getCspHeader(ctx));
  });

  it('should include the country-specific Google domain in script-src when country is set', () => {
    const country = 'fr';
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({ ctx, service: 'pidgin', toggles: {}, country });

    expect(getCspHeader(ctx)).toContain(`https://*.google.${country}`);
    expect(getCspHeader(ctx)).toMatch(/script-src.*https:\/\/\*\.google\.fr/);
  });

  it('should include the country-specific Google domain when the country header is uppercase', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({ ctx, service: 'pidgin', toggles: {}, country: 'FR' });

    expect(getCspHeader(ctx)).toMatch(/script-src.*https:\/\/\*\.google\.fr/);
  });

  it('should not include country-specific Google domain if country is not set', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({ ctx, service: 'pidgin', toggles: {}, country: null });

    expect(getCspHeader(ctx)).not.toMatch(/https:\/\/\*\.google\.fr/);
  });
});
