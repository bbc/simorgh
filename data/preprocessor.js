/* eslint-disable no-use-before-define */

const Preprocessor = (jsonRaw = {}) => {
  const json = { ...jsonRaw }; // make a copy so we don't corrupt the input
  const timestampNeeded = checkPropertiesExist({
    input: json,
    properties: [
      'metadata.firstPublished',
      'metadata.lastPublished',
      'content.model.blocks',
    ],
  });
  if (timestampNeeded) {
    const timestampBlock = {
      type: 'timestamp',
      model: {
        firstPublished: json.metadata.firstPublished,
        lastPublished: json.metadata.lastPublished,
      },
    };
    const { headlineBlocks, mainBlocks } = splitBlocksByHeadline(
      json.content.model.blocks,
    );
    if (headlineBlocks.length > 0) {
      // insert timestamp block immediately after headline
      json.content.model.blocks = [
        ...headlineBlocks,
        timestampBlock,
        ...mainBlocks,
      ];
    } else {
      // put timestamp block in as the first element
      json.content.model.blocks.unshift(timestampBlock);
    }
  }
  return json;
};

export const checkPropertiesExist = ({ input, properties }) =>
  properties.reduce(
    (validates, prop) => validates && validate(input, prop),
    true,
  );

const validate = (input, prop) => {
  const propParts = prop.split('.');
  const isNested = propParts.length > 1;
  const topmostProp = isNested ? propParts[0] : prop;
  const topmostPropExists = Object.prototype.hasOwnProperty.call(
    input,
    topmostProp,
  );
  if (isNested) {
    return (
      topmostPropExists &&
      validate(input[topmostProp], propParts.slice(1).join('.'))
    );
  }
  return topmostPropExists;
};

const splitBlocksByHeadline = blocks => {
  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

export default Preprocessor;
