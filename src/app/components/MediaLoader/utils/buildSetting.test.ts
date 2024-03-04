import { MediaBlock } from '../types';
import buildConfig from './buildSettings';
import blocks from '../fixture';

describe('buildSettings', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it('Should process an AresMedia block into a valid playlist item.', () => {
    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig).toStrictEqual({
      product: 'news',
      superResponsive: true,
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
    process.env.NODE_ENV = 'development';

    const mockWindowObj = {
      location: {
        search: '?renderer_env=test',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig).toHaveProperty('mediator', {
      host: 'open.test.bbc.co.uk',
    });
  });

  it('Should NOT include the mediator parameter if we are on a test environemnt, but renderer_env is set to live.', () => {
    process.env.NODE_ENV = 'development';

    const mockWindowObj = {
      location: {
        search: '?renderer_env=live',
      },
    } as Window & typeof globalThis;

    jest.spyOn(window, 'window', 'get').mockImplementation(() => mockWindowObj);

    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig.mediator).toBe(undefined);
  });

  it('Should NOT include the mediator parameter if we are on a live url.', () => {
    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig.mediator).toBe(undefined);
  });

  it('Should return null if the AresMedia block contains invalid data.', () => {
    const sampleBlock = [
      {
        model: { blocks: [{ model: { versions: [] } }] },
      } as unknown as MediaBlock,
    ];
    const result = buildConfig({
      id: 'testID',
      blocks: sampleBlock,
      pageType: 'article',
      counterName: null,
    });
    expect(result).toBe(null);
  });

  it('Should return super responsive as true, to make the video expand to its parent container.', () => {
    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
      counterName: null,
    });
    expect(result?.playerConfig.superResponsive).toStrictEqual(true);
  });
});