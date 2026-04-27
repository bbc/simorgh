import { NextPageContext } from 'next/types';
import addCspHeader from '.';

const createDocumentContext = (pathname: string, country?: string) => {
  const url = new URL(`https://www.test.bbc.com${pathname}`);
  const headers = new Headers({ 'x-country': `${country}` });

  return {
    req: {
      url: url.pathname,
      headers: Object.fromEntries(headers.entries()),
    },
    res: {
      getHeader: jest.fn(),
      setHeader: jest.fn(),
    },
  } as unknown as NextPageContext;
};

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

    addCspHeader({ ctx, service: 'pidgin', toggles: {} });

    const requestCsp = (ctx.res?.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    expect((requestCsp as string).includes(policy)).toBe(true);
  });

  it('should not set CSP headers in non-production environments', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    process.env = { ...processEnv, NODE_ENV: 'development' };

    addCspHeader({ ctx, service: 'pidgin', toggles: {} });

    const setHeaderCalls = (ctx.res?.setHeader as jest.Mock).mock.calls;

    const cspHeaderCall = setHeaderCalls.find(
      call => call[0] === 'Content-Security-Policy',
    );

    expect(cspHeaderCall).toBeUndefined();
  });
});

describe('shouldServeRelaxedCsp', () => {
  const processEnv = process.env;

  beforeEach(() => {
    process.env = { ...processEnv, NODE_ENV: 'production' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const expectedRelaxedCsp =
    "default-src  'self' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.googlesyndication.com;child-src  blob: https: 'self';connect-src  'self' https: ws: wss:;font-src  https: data: blob: 'self';frame-src  https: data:;img-src  https: data: blob:;script-src  https: 'unsafe-inline' 'unsafe-eval' blob: data: 'self';style-src  https: 'unsafe-inline';media-src  'self' blob: data: https:;worker-src  blob: data: 'self' *.bbc.co.uk *.bbc.com;report-to  worldsvc;upgrade-insecure-requests;";

  const expectedFullCsp =
    "default-src  'self' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.googlesyndication.com;child-src  'self';connect-src  'self' https: ws: wss:;font-src  *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com data: https://*.teads.tv https://cdnjs.cloudflare.com/ajax/libs/font-awesome/ https://fonts.gstatic.com;frame-src  'self' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.amazon-adsystem.com https://*.chartbeat.com https://*.doubleclick.net https://*.facebook.com https://*.google.com https://*.googleadservices.com https://*.googlesyndication.com https://*.mapcreator.io https://*.teads.tv https://*.thomsonreuters.com https://*.twitter.com https://bbc-maps.carto.com https://bbc.com https://cdn.privacy-mgmt.com https://chartbeat.com https://edigitalsurvey.com https://flo.uri.sh https://public.flourish.studio https://www.instagram.com https://www.riddle.com https://www.tiktok.com https://www.youtube-nocookie.com https://www.youtube.com;img-src  *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com data: 'self' http://ping.chartbeat.net https://*.adsafeprotected.com https://*.amazon-adsystem.com https://*.cdninstagram.com https://*.doubleclick.net https://*.effectivemeasure.net https://*.google.com https://*.googlesyndication.com https://*.googleusercontent.com https://*.gstatic.com https://*.imrworldwide.com https://*.teads.tv https://*.tiktokcdn.com https://*.twimg.com https://*.twitter.com https://*.xx.fbcdn.net https://i.ytimg.com https://logw363.ati-host.net https://logws1363.ati-host.net https://ping.chartbeat.net https://sb.scorecardresearch.com https://www.googleadservices.com;script-src  'self' 'unsafe-eval' 'unsafe-inline' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com http://*.chartbeat.com http://localhost:1124 http://localhost:7080 https://*.adsafeprotected.com https://*.amazon-adsystem.com https://*.chartbeat.com https://*.covatic.io https://*.doubleverify.com https://*.effectivemeasure.net https://*.facebook.com https://*.g.doubleclick.net https://*.google.com https://*.googlesyndication.com https://*.imrworldwide.com https://*.mapcreator.io https://*.permutive.com https://*.teads.tv https://*.thomsonreuters.com https://*.twimg.com https://*.twitter.com https://*.webcontentassessor.com https://*.xx.fbcdn.net https://adservice.google.co.uk https://bbc.gscontxt.net https://cdn.ampproject.org https://cdn.privacy-mgmt.com https://connect.facebook.net https://lf16-tiktok-web.ttwstatic.com https://public.flourish.studio https://sb.scorecardresearch.com https://www.googletagservices.com https://www.instagram.com https://www.riddle.com https://www.tiktok.com;style-src  'unsafe-inline' *.bbc.co.uk *.bbc.com *.bbci.co.uk *.bbci.com https://*.twimg.com https://*.twitter.com https://*.xx.fbcdn.net https://fonts.googleapis.com https://lf16-tiktok-web.ttwstatic.com;media-src  'self' blob: https:;worker-src  blob: 'self' *.bbc.co.uk *.bbc.com;report-to  worldsvc;upgrade-insecure-requests;";

  it('returns "relaxed" Csp when toggle is enabled but does not have values set', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {
        adsNonce: { enabled: true, value: '' },
      },
    });

    const requestCsp = (ctx.res?.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    expect(requestCsp).toEqual(expectedRelaxedCsp);
  });

  it('returns "relaxed" Csp when country is not in omittedCountries', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt', 'ax');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {
        adsNonce: { enabled: true, value: 'gb' },
      },
    });

    const requestCsp = (ctx.res?.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    expect(requestCsp).toEqual(expectedRelaxedCsp);
  });

  it('returns "full" CSP when toggle is enabled and given country is in omittedCountries', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt', 'gb');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {
        adsNonce: { enabled: true, value: 'gb,es' },
      },
    });

    const requestCsp = (ctx.res?.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    expect(requestCsp).toEqual(expectedFullCsp);
  });

  it('returns "full" CSP when adsNonce.enabled is false', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt', 'gb');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: { adsNonce: { enabled: false, value: '' } },
    });

    const requestCsp = (ctx.res?.setHeader as jest.Mock).mock.calls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    expect(requestCsp).toEqual(expectedFullCsp);
  });

  it('should include the country-specific Google domain in script-src when country is set', () => {
    const country = 'fr';
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt', country);

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {},
    });

    const setHeaderCalls = (ctx.res?.setHeader as jest.Mock).mock.calls;
    const cspHeader = setHeaderCalls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    // Check that the country-specific Google domain is present
    expect(cspHeader).toContain(`https://*.google.${country}`);
    // Optionally: check that script-src directive includes this (if you want to go deeper)
    expect(cspHeader).toMatch(/script-src.*https:\/\/\*\.google\.fr/);
  });

  it('should not include country-specific Google domain if country is not set', () => {
    const ctx = createDocumentContext('/pidgin/live/c7p765ynk9qt');

    addCspHeader({
      ctx,
      service: 'pidgin',
      toggles: {},
    });

    const setHeaderCalls = (ctx.res?.setHeader as jest.Mock).mock.calls;
    const cspHeader = setHeaderCalls.find(
      call => call[0] === 'Content-Security-Policy',
    )?.[1];

    // Should not contain any Google country domain
    expect(cspHeader).not.toMatch(/https:\/\/\*\.google\.fr/);
  });
});
