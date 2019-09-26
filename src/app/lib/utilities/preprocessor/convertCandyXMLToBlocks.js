import {
  candyXmlToRichText,
  stringToRichText,
} from '@fabl/rich-text-transforms';
import { clone, path } from 'ramda';

const handleCandyXML = block => candyXmlToRichText(block.text);
const handlePlainText = block => stringToRichText(block.text);
const handleMissingMarkupType = block => {
  console.log('missing markupType field on block');
  return block;
};

// list and altText don't have a markupType so add `undefined` for now
const parseByMarkupType = {
  candy_xml: handleCandyXML,
  plain_text: handlePlainText,
  undefined: handleMissingMarkupType,
};

const parseBlockByMarkupType = block => {
  const { markupType } = block;

  const parsedBlock = parseByMarkupType[markupType](block);

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
