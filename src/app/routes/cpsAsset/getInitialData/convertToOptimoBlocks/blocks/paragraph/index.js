import candyXmlToRichText from '#psammead/psammead-rich-text-transforms/src/candy-xml';
import stringToRichText from '#psammead/psammead-rich-text-transforms/src/string';

import { processBlock } from './helpers';

const convertParagraph = async block => {
  const xmlWrapper = innerXML =>
    `<body><paragraph>${innerXML}</paragraph></body>`;

  const proccessedBlock = processBlock(block);

  return proccessedBlock.markupType === 'candy_xml'
    ? candyXmlToRichText(xmlWrapper(proccessedBlock.text))
    : stringToRichText(proccessedBlock.text);
};

export default convertParagraph;
