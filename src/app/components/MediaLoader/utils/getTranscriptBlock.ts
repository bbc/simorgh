import filterForBlockType from '#app/lib/utilities/blockHandlers';
import { MediaBlock } from '../types';
import { TranscriptBlock } from '../../Transcript/types';

export default function getTranscriptBlock(
  blocks: MediaBlock[],
): TranscriptBlock | null {
  const transcriptBlock: TranscriptBlock = filterForBlockType(
    blocks,
    'transcript',
  );

  if (!transcriptBlock) return null;

  return transcriptBlock;
}
