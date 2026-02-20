import { aresMediaBlockWithTranscript } from '../fixture';
import getTitleForLiteSiteTranscriptBlock from './getTitleForLiteSiteTranscriptBlock';
import { MediaBlock } from '../types';

describe('getTitleForLiteSiteTranscriptBlock', () => {
  it('should return the title from aresMediaMetadata block', () => {
    const result = getTitleForLiteSiteTranscriptBlock(
      aresMediaBlockWithTranscript as MediaBlock[],
    );
    expect(result).toBe('Five things ants can teach us about management');
  });

  it('should return empty string if aresMedia block is missing', () => {
    const result = getTitleForLiteSiteTranscriptBlock([]);
    expect(result).toBe('');
  });

  it('should return empty string if aresMediaMetadata block is missing', () => {
    const blockMissingAresMediaMetadata = [
      {
        ...aresMediaBlockWithTranscript,
        model: {
          blocks: [
            {
              type: 'aresMedia',
              model: { blocks: [] },
            },
          ],
        },
      },
    ];

    const result = getTitleForLiteSiteTranscriptBlock(
      // @ts-expect-error - partial data
      blockMissingAresMediaMetadata,
    );
    expect(result).toBe('');
  });

  it('should return empty string if title is missing', () => {
    const blockMissingTitle = [
      {
        ...aresMediaBlockWithTranscript,
        model: {
          blocks: [
            {
              type: 'aresMedia',
              model: {
                blocks: [
                  {
                    type: 'aresMediaMetadata',
                    model: {},
                  },
                ],
              },
            },
          ],
        },
      },
    ];

    // @ts-expect-error - partial data
    const result = getTitleForLiteSiteTranscriptBlock(blockMissingTitle);
    expect(result).toBe('');
  });
});
