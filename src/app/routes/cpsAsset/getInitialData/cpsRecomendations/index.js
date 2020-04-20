import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import splitAt from 'ramda/src/splitAt';
import { optimoSubheadline } from '../convertToOptimoBlocks/utils/helpers';

const isCpsParagraph = (block) => {
  /* In CPS the following blocks are considered paragraphs
    Image, Audio, Video, Paragraph
  */
  const mediaTypes = ['image', 'audio', 'video'];
  if (mediaTypes.includes(block.type)) return true;

  if (block.type === 'text') {
    const paragraphBlocks = path(['model', 'blocks'], block).filter(
      (b) => b.type === 'paragraph',
    );
    return !!paragraphBlocks.length;
  }
  return false;
};

const getNthCpsParagraphIndex = (blocks, n) => {
  let indexCount = 0; // maybe make it the lastt block just incase there's no paragraph blocks
  let paragraphCount = 0;
  blocks.some((block, index) => {
    if (isCpsParagraph(block)) {
      paragraphCount += 1;
    }
    if (paragraphCount === n) {
      indexCount = index;
      return true;
    }
    indexCount += 1;
    return false;
  });
  return indexCount;
};

const insertRecommendationsBlock = (recommendations, blocks) => {
  // get the index of the 7th paragraph
  const reccomendationIndex = getNthCpsParagraphIndex(blocks, 7) + 1;

  // split blocks at the index of the 7th paragraph
  const [a, b] = splitAt(reccomendationIndex, blocks);

  // reconstruct
  return [...a, { ...recommendations }, ...b];
};

const cpsRecomendations = (originalJson) => {
  const json = deepClone(originalJson);
  const pageType = path(['metadata', 'type'], json);
  const blocks = path(['content', 'model', 'blocks'], json);

  if (pageType !== 'STY' || !blocks) {
    return json;
  }

  const block = optimoSubheadline([
    {
      fragments: [
        {
          fragment: 'RECOMMENDATIONS SHOULD APPEAR HERE',
          attributes: [],
        },
      ],
      text: 'RECOMMENDATIONS SHOULD APPEAR HERE',
    },
  ]);

  json.content.model.blocks = insertRecommendationsBlock(block, blocks);

  return json;
};

export default cpsRecomendations;
