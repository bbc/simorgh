import loadable from '@loadable/component';
import { processBlock } from './helpers';

const richTextTransforms = loadable(() =>
  import(
    /* webpackChunkName: 'rich-text-transforms' */ '@bbc/psammead-rich-text-transforms'
  ),
);

const convertParagraph = async (block) => {
  const {
    candyXmlToRichText,
    stringToRichText,
  } = await richTextTransforms.load();

  const xmlWrapper = (innerXML) =>
    `<body><paragraph>${innerXML}</paragraph></body>`;

  const proccessedBlock = processBlock(block);

  return proccessedBlock.markupType === 'candy_xml'
    ? candyXmlToRichText(xmlWrapper(proccessedBlock.text))
    : stringToRichText(proccessedBlock.text);
};

export default convertParagraph;
