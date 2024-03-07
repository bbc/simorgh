import buildSettings from './buildSettings';
import { aresMediaBlocks, clipMediaBlocks } from '../fixture';

describe('buildSettings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Should process a ClipMedia block into a valid playlist item.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      id: 'testID',
      blocks: clipMediaBlocks,
      pageType: 'live',
      counterName: null,
    });

    expect(result?.playerConfig).toStrictEqual({
      product: 'news',
      superResponsive: true,
      enableToucan: true,
      playlistObject: {
        title:
          "BBC launch trailer for We Know Our Place women's sport campaign",
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01thw3g.jpg',
        items: [{ duration: 54, kind: 'programme', versionID: 'p01thw22' }],
      },
    });
  });

  it('Should process an AresMedia block into a valid playlist item.', () => {
    const mockWindowObj = {
      location: {
        hostname: 'https://www.bbc.com/',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildSettings({
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
    });

    expect(result?.playerConfig).toStrictEqual({
      product: 'news',
      superResponsive: true,
      enableToucan: true,
      playlistObject: {
        title: 'Five things ants can teach us about management',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/512xn/p01k6mtv.jpg',
        items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
        guidance: 'Contains strong language and adult humour.',
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
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
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
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
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
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
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
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
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
      id: 'testID',
      // @ts-expect-error - we are testing an invalid block
      blocks: sampleBlock,
      pageType: 'article',
      counterName: null,
    });
    expect(result).toBe(null);
  });

  it('Should return super responsive as true, to make the video expand to its parent container.', () => {
    const result = buildSettings({
      id: 'testID',
      blocks: aresMediaBlocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig.superResponsive).toStrictEqual(true);
  });
});
