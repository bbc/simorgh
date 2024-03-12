import { PageTypes, Services } from '#app/models/types/global';
import buildSettings from './buildSettings';
import { aresMediaBlocks, clipMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';

const baseSettings = {
  id: 'testID',
  pageType: 'article' as PageTypes,
  counterName: null,
  isAmp: false,
  lang: 'es',
  service: 'mundo' as Services,
};

describe('buildSettings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should process a ClipMedia block into a valid playlist item for a "Live" page.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: clipMediaBlocks as MediaBlock[],
      pageType: 'live',
    });

    expect(result?.playerConfig).toStrictEqual({
      autoplay: true,
      product: 'news',
      superResponsive: true,
      enableToucan: true,
      appName: 'news-mundo',
      appType: 'responsive',
      externalEmbedUrl: '',
      playlistObject: {
        title:
          "BBC launch trailer for We Know Our Place women's sport campaign",
        summary:
          'BBC launch trailer for We Know Our Place women\'s sport campaign"',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg',
        items: [{ duration: 54, kind: 'programme', versionID: 'p01thw22' }],
        embedRights: 'allowed',
      },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'es' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    });
  });

  it('Should process an AresMedia block into a valid playlist item for an "article" page.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig).toStrictEqual({
      autoplay: true,
      product: 'news',
      superResponsive: true,
      enableToucan: true,
      appName: 'news-mundo',
      appType: 'responsive',
      externalEmbedUrl: '',
      playlistObject: {
        title: 'Five things ants can teach us about management',
        summary: 'This is a caption!',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
        items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
        guidance: 'Contains strong language and adult humour.',
        embedRights: 'allowed',
      },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'es' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    });
  });

  it('Should process an AresMedia block into a valid playlist item for a "mediaArticle" page.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
      pageType: 'mediaArticle',
    });

    expect(result?.playerConfig).toStrictEqual({
      autoplay: false,
      preload: 'high',
      product: 'news',
      superResponsive: true,
      enableToucan: true,
      appName: 'news-mundo',
      appType: 'responsive',
      externalEmbedUrl: '',
      playlistObject: {
        title: 'Five things ants can teach us about management',
        summary: 'This is a caption!',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
        items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
        guidance: 'Contains strong language and adult humour.',
        embedRights: 'allowed',
      },
      ui: {
        controls: { enabled: true },
        locale: { lang: 'es' },
        subtitles: { enabled: true, defaultOn: true },
        fullscreen: { enabled: true },
      },
    });
  });

  it('Should include the mediator parameter if we are on a test url.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.test.bbc.com/',
        search: '?renderer_env=test',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig).toHaveProperty('mediator', {
      host: 'open.test.bbc.co.uk',
    });
  });

  it('Should include the mediator parameter if we are on a dev environment.', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    const mockWindowObj = {
      location: {
        hostname: 'https://www.test.bbc.com/',
        search: '',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig).toHaveProperty('mediator', {
      host: 'open.test.bbc.co.uk',
    });
  });

  it('Should NOT include the mediator parameter if we are on a test environemnt, but renderer_env is set to live.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.test.bbc.com/',
        search: '?renderer_env=live',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig.mediator).toBe(undefined);
  });

  it('Should NOT include the mediator parameter if we are on a live url.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig.mediator).toBe(undefined);
  });

  it('Should return null if the AresMedia block contains invalid data.', () => {
    const sampleBlock = [
      {
        model: { blocks: [{ model: { versions: [] } }] },
      },
    ];
    const result = buildSettings({
      ...baseSettings,
      // @ts-expect-error - we are testing an invalid block
      blocks: sampleBlock,
    });

    expect(result).toBe(null);
  });

  it('Should return super responsive as true, to make the video expand to its parent container.', () => {
    const result = buildSettings({
      ...baseSettings,
      blocks: aresMediaBlocks as MediaBlock[],
    });

    expect(result?.playerConfig.superResponsive).toStrictEqual(true);
  });
});
