import { clone, path } from 'ramda';
import {
  candyXmlToRichText,
  stringToRichText,
} from '../../../../../../fabl-modules/libraries/rich-text-transforms';

const wrapText = innerXML => `<body><paragraph>${innerXML}</paragraph></body>`;

const handleCandyXML = xml => candyXmlToRichText(xml);

const handlePlainText = block => stringToRichText(block.text);

const handleMissingType = block => {
  console.log(`Missing type field on block ${block.type}`);
  return block;
};

const handleParagraph = block =>
  block.markupType === 'candy_xml'
    ? handleCandyXML(wrapText(block.text))
    : handlePlainText(block);

const subheadlineBlock = textBlock => ({
  type: 'subheadline',
  model: {
    blocks: [textBlock],
  },
});

const handleCrosshead = block =>
  block.markupType === 'candy_xml'
    ? subheadlineBlock(handleCandyXML(wrapText(block.text)))
    : subheadlineBlock(handlePlainText(block));

// list and altText don't have a markupType so add `undefined` for now
const parseByType = {
  paragraph: handleParagraph,
  // subheading: handleMissingType,
  crosshead: handleCrosshead,
  // image: handleMissingType,
  // list: handleMissingType,
  // media: handleMissingType,
  // social_embed: handleMissingType,
};

const parseBlockByMarkupType = block => {
  const { type } = block;

  const parsedBlock = (parseByType[type] || handleMissingType)(block);

  return parsedBlock;
};

const convertCandyXMLToBlocks = jsonRaw => {
  const json = clone(jsonRaw);
  const blocks = path(['content', 'blocks'], json);

  const parsedBlocks = blocks.map(block => {
    return parseBlockByMarkupType(block);
  });

  json.content.blocks = parsedBlocks;

  return json;
};

export default convertCandyXMLToBlocks;
