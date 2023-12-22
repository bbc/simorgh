import { MediaBlock } from '../types.d';
import liveConfig from './buildSettings';
import sampleBlocks from './fixture';

describe('buildSettings', () => {
  it('Should process an AresMedia block into a valid playlist item.', () => {
    const result = liveConfig(sampleBlocks);
    expect(result).toStrictEqual({
      product: 'news',
      superResponsive: true,
      counterName: 'smp.demopage.player.page',
      playlistObject: {
        title: 'Five things ants can teach us about management',
        holdingImageURL:
          'https://ichef.test.bbci.co.uk/images/ic/{recipe}/p01k6mtv.jpg',
        items: [{ duration: 191, kind: 'programme', versionID: 'p01k6msp' }],
        guidance: 'Contains strong language and adult humour.',
      },
    });
  });

  it('Should include the mediator parameter if we are on a test url.', () => {
    process.env.NODE_ENV = 'development';

    const result = liveConfig(sampleBlocks);
    expect(result).toHaveProperty('mediator', { host: 'open.test.bbc.co.uk' });
  });

  it('Should NOT include the mediator parameter if we are on a live url.', () => {
    process.env.NODE_ENV = 'live';

    const result = liveConfig(sampleBlocks);
    expect(result?.mediator).toBe(undefined);
  });

  it('Should return null if the AresMedia block contains invalid data.', () => {
    const result = liveConfig([
      {
        model: { blocks: [{ model: { versions: [] } }] },
      } as unknown as MediaBlock,
    ]);
    expect(result).toBe(null);
  });
});
