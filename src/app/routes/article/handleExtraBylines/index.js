import clone from 'ramda/src/clone';
import path from 'ramda/src/path';

export default json => {
  const pageData = clone(json);
  const blocks = path(['content', 'model', 'blocks'], pageData);

  const blocksWithoutExtraByline = blocks.map((block, index) => {
    const type = path(['type'], block);
    if (type === 'byline' && index !== 2) {
      return null;
    }
    return block;
  });

  pageData.content.model.blocks = blocksWithoutExtraByline;
  return pageData;
};
