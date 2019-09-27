import {
  candyXmlToRichText,
  stringToRichText,
} from '@fabl/rich-text-transforms';
import { clone, path } from 'ramda';

const wrapInBody = innerXML => `<body>${innerXML}</body>`;

const handleCandyXML = xml => candyXmlToRichText(xml);

const handlePlainText = block => stringToRichText(block.text);

const handleMissingType = block => {
  console.log(`Missing type field on block ${block.type}`);
  return block;
};

const handleParagraph = block =>
  block.markupType === 'candy_xml'
    ? handleCandyXML(wrapInBody(`<paragraph>${block.text}</paragraph>`))
    : handlePlainText(block);

// list and altText don't have a markupType so add `undefined` for now
const parseByType = {
  paragraph: handleParagraph,
  heading: handleMissingType,
  subheading: handleMissingType,
  crosshead: handleMissingType,
  image: handleMissingType,
  list: handleMissingType,
  media: handleMissingType,
  undefined: handleMissingType,
};

const parseBlockByMarkupType = block => {
  const { type } = block;

  const parsedBlock = parseByType[type](block);

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
