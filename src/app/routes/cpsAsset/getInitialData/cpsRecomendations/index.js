import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import splitAt from 'ramda/src/splitAt';

const getSixthParagraphIndex = (originalBlocks) => {
  const blocks = deepClone(originalBlocks);
  const p = blocks.reduce(
    (acc, block, index) => {
      const { type, position } = block;
      const count = acc.processedBlocks.length;
      if (count >= 6) {
        console.log('peeeeeyyyyyeeeeer ===>', type, count);
        return acc;
      }
      console.log('IN LOOP ===>', index, type, count);
      let targetIndex;
      let processedBlocks = [];
      if (type === 'image') {
        console.log(
          'COUNTING ===>',
          index,
          type,
          count,
          position[0],
          position[1],
        );
        processedBlocks = [...acc.processedBlocks, block];
        targetIndex = index;
      }

      if (type === 'text') {
        console.log(
          'COUNTING ===>',
          index,
          type,
          count,
          position[0],
          position[1],
        );
        const paragraphBlocks = path(['model', 'blocks'], block).filter(
          (blk) => blk.type === 'paragraph',
        );
        if (paragraphBlocks.length) {
          processedBlocks = [...acc.processedBlocks, block];
          targetIndex = index;
        }
      }
      console.log('LOOP END c ===>', processedBlocks.length);
      console.log('LOOP END p ===>', acc.processedBlocks.length);
      return {
        targetIndex,
        processedBlocks,
      };
    },
    {
      targetIndex: 0,
      processedBlocks: [],
    },
  );
  console.log('peeeeeeeeeer ===>', p);
  console.log('pllleeeeeeeeeer ===>', p.processedBlocks.length);
  return [p.targetIndex, p.processedBlocks];
};

const insertAfterSixthParagraph = (targetBlock, blocks) => {
  const [i, j] = getSixthParagraphIndex(blocks);
  const [a, b] = splitAt(i, blocks);
  return [...a, { ...targetBlock, ticks: j }, ...b];
};

const cpsOnlyOnwardJourneys = (originalJson) => {
  const json = deepClone(originalJson);
  const blocks = path(['content', 'model', 'blocks'], json);

  const rec = {
    type: 'rec',
    blocks: [],
  };

  json.content.model.blocks = insertAfterSixthParagraph(rec, blocks);

  return json;
};

export default cpsOnlyOnwardJourneys;
