import path from 'ramda/src/path';
import assocPath from 'ramda/src/assocPath';

const getBlocks = path(['content', 'model', 'blocks']);
const setBlocks = assocPath(['content', 'model', 'blocks']);
const setTextBlock = assocPath(['model', 'blocks']);

const isEmptyParagraph = block => {
  return block.type === 'paragraph' && !block.model?.text;
};

const removeEmptyParagraphsFromTextBlock = textBlock => {
  const cleanedTextData = textBlock.model?.blocks?.filter(
    block => !isEmptyParagraph(block),
  );
  return setTextBlock(cleanedTextData, textBlock);
};

const removeEmptyParagraphs = pageData => {
  const cleanedData = getBlocks(pageData).map(block => {
    if (block.type !== 'text') return block;
    return removeEmptyParagraphsFromTextBlock(block);
  });
  return setBlocks(cleanedData, pageData);
};

export default removeEmptyParagraphs;
