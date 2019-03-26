/* eslint-disable no-use-before-define */

const Preprocessor = (jsonRaw = {}) => {
  try {
    const canRenderTimestamp = checkInputContainsProperties({
      input: jsonRaw,
      properties: [
        'metadata.firstPublished',
        'metadata.lastUpdated',
        'content.model.blocks',
      ],
    });
    if (canRenderTimestamp) {
      // construct a new block from the metadata
      const timestampBlock = {
        type: 'timestamp',
        model: {
          published: jsonRaw.metadata.firstPublished,
          updated: jsonRaw.metadata.lastUpdated,
        },
      };
      return insertTimestampBlock(jsonRaw, timestampBlock);
    }
  } catch (e) {
    // if our block manipulation fails for whatever reason, fall back to jsonRaw
  }
  return jsonRaw;
};

export const checkInputContainsProperties = ({ input, properties }) =>
  properties.reduce(
    (validates, prop) => validates && inputContainsProperty(input, prop),
    true,
  );

const deepClone = originalObj => JSON.parse(JSON.stringify(originalObj));

/**
 * Checks if Object has property by name.
 * Properties can be single ('foo.bar') or chained ('foo.bar.baz')
 * So can run `if (inputContainsProperty(myInput, 'foo.bar.baz))` to check for child property.
 * Saves having to do `if (foo && foo.bar && foo.bar.baz) `.
 * @param {Object} input e.g. { foo: { bar: 'baz' } }
 * @param {String} prop e.g. 'foo.bar'
 */
const inputContainsProperty = (input, prop) => {
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
      inputContainsProperty(input[topmostProp], propParts.slice(1).join('.'))
    );
  }
  return topmostPropExists;
};

/**
 * Where the `timestampBlock` is inserted in the payload is dependent on the
 * presence or absence of a `headline` block, and other factors.
 * @param {Object} json
 * @param {Object} timestampBlock
 */
const insertTimestampBlock = (originalJson, timestampBlock) => {
  const json = deepClone(originalJson); // make a copy so we don't corrupt the input
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
  return json;
};

const splitBlocksByHeadline = blocks => {
  const headlineIndexPlusOne =
    blocks.findIndex(({ type }) => type === 'headline') + 1;

  const headlineBlocks = blocks.slice(0, headlineIndexPlusOne);
  const mainBlocks = blocks.slice(headlineIndexPlusOne, blocks.length);

  return { headlineBlocks, mainBlocks };
};

export default Preprocessor;
