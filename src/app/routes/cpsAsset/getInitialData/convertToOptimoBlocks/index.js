import clone from 'ramda/src/clone';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import paragraph from './blocks/paragraph';
import media from './blocks/media';
import legacyMedia from './blocks/legacyMedia';
import image from './blocks/image';
import list from './blocks/list';
import subheadline from './blocks/subheadline';
import version from './blocks/version';
import include from './blocks/include';

const handleMissingType = block =>
  console.log(`Missing type field on block ${block.type}`); // eslint-disable-line no-console

const typesToConvert = {
  crosshead: subheadline,
  heading: subheadline,
  subheading: subheadline,
  image,
  paragraph,
  list,
  media,
  version,
  legacyMedia,
  include,
};

const parseBlockByType = (block, json) => {
  if (!path(['type'], block)) return false;

  const { type } = block;

  const parsedBlock = (typesToConvert[type] || handleMissingType)(block, json);

  if (!parsedBlock) {
    return null;
  }

  return parsedBlock;
};

const convertToOptimoBlocks = async jsonRaw => {
  const json = clone(jsonRaw);

  const blocks = pathOr([], ['content', 'blocks'], json);

  const parsedBlocks = await Promise.all(
    blocks.map(block => parseBlockByType(block, json)),
  );

  return {
    ...json,
    content: {
      model: {
        blocks: parsedBlocks.filter(Boolean),
      },
    },
  };
};

export default convertToOptimoBlocks;
