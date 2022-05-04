import richTextTransforms from '#legacy/psammead-rich-text-transforms/src';
import { processBlock } from './helpers';

const convertParagraph = async block => {
  const { candyXmlToRichText, stringToRichText } = richTextTransforms;

  const xmlWrapper = innerXML =>
    `<body><paragraph>${innerXML}</paragraph></body>`;

  const proccessedBlock = processBlock(block);

  return proccessedBlock.markupType === 'candy_xml'
    ? candyXmlToRichText(xmlWrapper(proccessedBlock.text))
    : stringToRichText(proccessedBlock.text);
};

export default convertParagraph;
