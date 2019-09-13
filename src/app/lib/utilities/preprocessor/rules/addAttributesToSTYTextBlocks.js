import convert from 'xml-js';
import pathOr from 'ramda/src/pathOr';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';

const createTextBlock = textBlock => ({
  text: textBlock.text || textBlock.elements[0].text,
  attributes: textBlock.name ? [textBlock.name] : [],
});

const addAttributesText = textXml => {
  const textBlocks = pathOr(
    null,
    ['elements', 0, 'elements'],
    convert.xml2js(textXml),
  );

  return textBlocks.map(textBlock => createTextBlock(textBlock));
};

const addAttributesToSTYTextBlocks = jsonRaw => {
  const blocks = pathOr(null, ['content', 'blocks'], jsonRaw);
  let introductionBolded = false;

  const processedBlocks = blocks.map(block => {
    if (block.type !== 'paragraph') return block;

    let wrappedText = `<text>${block.text}</text>`;
    if (!introductionBolded)
      wrappedText = `<text><bold>${block.text}</bold></text>`;
    introductionBolded = true;

    const newParagraphBlock = {
      textBlocks: addAttributesText(wrappedText),
      markupType: 'plain_text',
      type: 'paragraph',
    };

    return newParagraphBlock;
  });

  return mergeDeepLeft(
    {
      content: { blocks: processedBlocks },
    },
    jsonRaw,
  );
};

export default addAttributesToSTYTextBlocks;
