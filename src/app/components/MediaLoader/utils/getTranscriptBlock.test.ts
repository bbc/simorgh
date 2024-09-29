import { aresMediaBlockWithTranscript, aresMediaBlocks } from '../fixture';
import { MediaBlock } from '../types';
import getTranscriptBlock from './getTranscriptBlock';
import TranscriptBlock from '../../Transcript/fixture.json';

describe('getTranscriptBlock', () => {
  it('Should return a valid transcript block for an AresMedia block for an article page.', () => {
    const result = getTranscriptBlock(
      aresMediaBlockWithTranscript as MediaBlock[],
    );

    expect(result).toStrictEqual(TranscriptBlock);
  });

  it('Should return null if no transcript block is present.', () => {
    const result = getTranscriptBlock(aresMediaBlocks as MediaBlock[]);

    expect(result).toStrictEqual(null);
  });
});
