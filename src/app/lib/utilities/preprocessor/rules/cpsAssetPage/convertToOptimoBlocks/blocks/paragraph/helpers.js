/* eslint-disable import/prefer-default-export */
import path from 'ramda/src/path';

const boldWrap = text => `<bold>${text}</bold>`;

// CPS encodes some known special characters into HTML entities
// This function reverses that process, to prepare the text for rendering
const parseReplacements = (
  text,
  replacements = {
    '%3C': '&lt;',
    '%3E': '&gt;',
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
  },
) => {
  const replacementsRegex = new RegExp(
    Object.keys(replacements).join('|'),
    'gi',
  );
  return text.replace(replacementsRegex, match => replacements[match]);
};

export const processBlock = _block => {
  const block = _block;

  if (path(['text'], block)) {
    // make introductions bold
    if (block.role === 'introduction') {
      block.text = boldWrap(block.text);
      block.markupType = 'candy_xml';
    } else {
      block.text = parseReplacements(block.text);
    }
  }

  return block;
};
