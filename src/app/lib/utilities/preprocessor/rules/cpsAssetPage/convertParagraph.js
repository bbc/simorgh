import loadable from '@loadable/component';

const richTextTransforms = loadable(() =>
  import('@bbc/psammead-rich-text-transforms'),
);

const convertParagraph = async block => {
  const {
    candyXmlToRichText,
    stringToRichText,
  } = await richTextTransforms.load();

  const xmlWrapper = innerXML =>
    `<body><paragraph>${innerXML}</paragraph></body>`;

  return block.markupType === 'candy_xml'
    ? candyXmlToRichText(xmlWrapper(block.text))
    : stringToRichText(block.text);
};

export default convertParagraph;
