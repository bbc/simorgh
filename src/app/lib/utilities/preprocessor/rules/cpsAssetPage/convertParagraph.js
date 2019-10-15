import {
  candyXmlToRichText,
  stringToRichText,
} from '@bbc/psammead-rich-text-transforms';

const xmlWrapper = innerXML =>
  `<body><paragraph>${innerXML}</paragraph></body>`;

const convertParagraph = block =>
  block.markupType === 'candy_xml'
    ? candyXmlToRichText(xmlWrapper(block.text))
    : stringToRichText(block.text);

export default convertParagraph;
