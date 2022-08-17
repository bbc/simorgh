import clone from 'ramda/src/clone';
import path from 'ramda/src/path';

export default json => {
  const pageData = clone(json);
  const blocks = path(['content', 'model', 'blocks'], pageData);

  let foundFirstByline = false;
  const blocksWithoutExtraByline = blocks.map(block => {
    const type = path(['type'], block);
    if (type === 'byline') {
      if (foundFirstByline) {
        return null;
      }
      foundFirstByline = true;
    }
    return block;
  });

  pageData.content.model.blocks = blocksWithoutExtraByline;
  return pageData;
};
