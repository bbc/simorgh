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
};

const parseBlockByType = block => {
  if (!path(['type'], block)) return false;
  // console.log(`block: ${block.type}`);

  const { type } = block;

  const parsedBlock = (typesToConvert[type] || handleMissingType)(block);

  if (!parsedBlock) {
    return null;
  }

  return parsedBlock;
};

const convertToOptimoBlocks = async jsonRaw => {
  const json = clone(jsonRaw);

  const blocks = pathOr([], ['content', 'blocks'], json);

  const versionBlock = blocks.filter(block => {
    return block.type === 'version';
  });

  if (versionBlock && blocks.length > 0) {
    const headline = path(['promo', 'headlines', 'headline'], json);
    blocks[0].headline = headline;
  }

  console.log(`blockLog: ${JSON.stringify(blocks[0])}`);

  const parsedBlocks = await Promise.all(blocks.map(parseBlockByType));

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
