import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

const getBlocks = path(['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);

const handlePromoData = pageData => {
  const dataBlocks = getBlocks(pageData);
  const finalBlock = dataBlocks.length - 1;

  if (dataBlocks[finalBlock].type === 'links') {
    dataBlocks[finalBlock].type = 'relatedContent';
  }
  return setBlocks(dataBlocks, pageData);
};

export default handlePromoData;
