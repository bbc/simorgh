import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import fetchToggles from '#app/lib/utilities/fetchToggles';
import fetchConfig from '#app/lib/utilities/fetchConfig';
import getIdctaConfig from '#app/lib/idcta/getIdctaConfig';
import { Toggles } from '#app/models/types/global';
import { getRequestNonce } from '#utilities/addCspHeader/requestNonce';
import getRequestProps from './getRequestProps';

jest.mock('#app/lib/utilities/fetchToggles');
jest.mock('#app/lib/utilities/fetchConfig');
jest.mock('#app/lib/idcta/getIdctaConfig');
jest.mock('#utilities/addCspHeader/createNonce', () => () => 'request-nonce');

const mockFetchToggles = jest.mocked(fetchToggles);
const mockFetchConfig = jest.mocked(fetchConfig);
const mockGetIdctaConfig = jest.mocked(getIdctaConfig);
const toggles: Toggles = {
  ads: { enabled: true },
  adsNonce: { enabled: true },
};

const createContext = (
  asPath = '/serbian/articles/c0000000000o/lat',
  requestUrl = asPath,
) => {
  const req = new IncomingMessage(new Socket());
  req.url = requestUrl;
  req.headers = {
    host: 'www.bbc.com',
    'x-country': 'GB',
    'bbc-adverts': 'true',
    'bbc-origin': 'https://www.bbc.com',
    'mvt-test-experiment': 'variation-a',
    'req-svc-chain': 'upstream',
  };

  return {
    req,
    res: new ServerResponse(req),
    asPath,
    pathname: asPath.split('?')[0],
  };
};

describe('getRequestProps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.replaceProperty(process, 'env', {
      ...process.env,
      NODE_ENV: 'production',
    });
    mockFetchToggles.mockResolvedValue(toggles);
    mockFetchConfig.mockResolvedValue({ data: { items: [] } });
    mockGetIdctaConfig.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('loads service and variant configuration and extracts request headers', async () => {
    const ctx = createContext();
    const props = await getRequestProps(ctx);

    expect(mockFetchToggles).toHaveBeenCalledWith({
      service: 'serbian',
      isAmp: false,
    });
    expect(mockFetchConfig).toHaveBeenCalledWith({
      service: 'serbian',
      variant: 'lat',
      configType: 'navigation',
      pagePath: ctx.asPath,
    });
    expect(mockGetIdctaConfig).toHaveBeenCalledWith(
      toggles,
      'serbian',
      ctx.req.headers,
    );
    expect(props).toMatchObject({
      bbcOrigin: 'https://www.bbc.com',
      country: 'gb',
      isUK: true,
      showAdsBasedOnLocation: true,
      showCookieBannerBasedOnCountry: true,
      service: 'serbian',
      variant: 'lat',
      isApp: false,
      isAmp: false,
      isLite: false,
      isNextJs: true,
      toggles,
      navItems: [],
      idctaConfig: null,
      serverSideExperiments: [
        {
          experimentName: 'test-experiment',
          variation: 'variation-a',
          enabled: false,
        },
      ],
    });
  });

  it('sets response headers and shares the CSP nonce with document rendering', async () => {
    const ctx = createContext();
    const props = await getRequestProps(ctx);

    expect(props.nonce).toBe('request-nonce');
    expect(props.cspHeader).toContain("'nonce-request-nonce'");
    expect(getRequestNonce(ctx.req)).toBe(props.nonce);
    expect(ctx.res.getHeader('report-to')).toBeDefined();
    expect(ctx.res.getHeader('req-svc-chain')).toBe('upstream,SIMORGH');
    expect(ctx.res.getHeader('onion-location')).toContain(ctx.asPath);
    expect(ctx.res.getHeader('Vary')).toContain('X-Country');
    expect(ctx.res.getHeader('Link')).toContain('rel="preconnect"');
  });

  it.each([
    ['.amp', true, false, false],
    ['.lite', false, true, false],
    ['.app', false, false, true],
  ])(
    'uses the resolved path for %s data requests',
    async (extension, isAmp, isLite, isApp) => {
      const path = `/pidgin/articles/c0000000000o${extension}`;
      const ctx = createContext(path, `/_next/data/build${path}.json`);
      const props = await getRequestProps(ctx);

      expect(props).toMatchObject({ isAmp, isLite, isApp });
      expect(mockFetchToggles).toHaveBeenCalledWith({
        service: 'pidgin',
        isAmp,
      });
      expect(ctx.res.getHeader('onion-location')).toContain(path);
      if (isAmp || isLite) {
        expect(props.nonce).toBeNull();
        expect(ctx.res.getHeader('Content-Security-Policy')).toBe(
          props.cspHeader,
        );
      }
    },
  );

  it('keeps the CSP header for AV embed data requests', async () => {
    const path = '/pidgin/av-embeds/articles/c0000000000o';
    const ctx = createContext(path, `/_next/data/build${path}.json`);
    const props = await getRequestProps(ctx);

    expect(props.nonce).toBe('request-nonce');
    expect(ctx.res.getHeader('Content-Security-Policy')).toBe(props.cspHeader);
  });

  it('retains configuration fallbacks when optional fetches fail', async () => {
    mockFetchToggles.mockRejectedValue(new Error('Toggles unavailable'));
    mockFetchConfig.mockRejectedValue(new Error('Navigation unavailable'));

    const props = await getRequestProps(createContext());

    expect(props.toggles).toEqual({});
    expect(props.navItems).toBeNull();
    expect(mockGetIdctaConfig).toHaveBeenCalledWith(
      {},
      'serbian',
      expect.any(Object),
    );
  });

  it('uses the news service for unrecognised error routes', async () => {
    const props = await getRequestProps(createContext('/not-a-service'));

    expect(props.service).toBe('news');
    expect(mockFetchToggles).toHaveBeenCalledWith({
      service: 'news',
      isAmp: false,
    });
  });
});
