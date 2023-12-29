import { MediaBlock } from '../types.d';
import buildConfig from './buildSettings';
import blocks from '../fixture';

describe('buildSettings', () => {
  it('Should process an AresMedia block into a valid playlist item.', () => {
    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
    });
    expect(result).toStrictEqual({
      product: 'news',
      superResponsive: true,
      counterName: 'smp.demopage.player.page',
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
    });
    expect(result).toHaveProperty('mediator', { host: 'open.test.bbc.co.uk' });
  });

  it('Should NOT include the mediator parameter if we are on a live url.', () => {
    process.env.NODE_ENV = 'live';

    const result = buildConfig({
      id: 'testID',
      blocks,
      pageType: 'article',
    });
    expect(result?.mediator).toBe(undefined);
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
    });
    expect(result).toBe(null);
  });
});
