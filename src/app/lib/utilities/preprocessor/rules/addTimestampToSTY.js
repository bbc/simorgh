import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';

const addTimestampToSTY = jsonRaw => {
  const firstPublished = pathOr(null, ['metadata', 'firstPublished'], jsonRaw);
  const lastPublished = pathOr(null, ['metadata', 'lastPublished'], jsonRaw);

  if (!firstPublished || !lastPublished) {
    return jsonRaw;
  }

  const newBlock = {
    firstPublished: firstPublished * 1000,
    lastPublished: lastPublished * 1000,
    type: 'timestamp',
  };

  return {
    ...jsonRaw,
    content: {
      ...path(['content'], jsonRaw),
      blocks: [newBlock, ...path(['content', 'blocks'], jsonRaw)],
    },
  };
};

export default addTimestampToSTY;
