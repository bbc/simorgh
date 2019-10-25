/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';

const boldWrap = text => `<bold>${text}</bold>`;

const escapeDoubleQuotes = text => text.replace(/&quot;/g, '"');

export const processBlock = _block => {
  const block = _block;

  if (path(['text'], block)) {
    // escape quotes in all text
    block.text = escapeDoubleQuotes(block.text);

    // make introductions bold
    if (block.role === 'introduction') {
      block.text = boldWrap(block.text);
      block.markupType = 'candy_xml';
    }
  }

  return block;
};
