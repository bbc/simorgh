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
  const block = { ..._block };

  if (path(['text'], block)) {
    // catch plain_text ARES response for legacy MAPs with <link> elements
    if (block.text.includes('</link>')) {
      block.markupType = 'candy_xml';
    }

    // make introductions bold
    if (block.role === 'introduction') {
      block.text = boldWrap(block.text);
      block.markupType = 'candy_xml';
    } else if (block.markupType !== 'candy_xml') {
      // We do not do this for candy_xml, as chevrons can be misinterpreted
      // as XML tags once the text is handed off to the rich text transformer
      block.text = parseReplacements(block.text);
    }
  }

  return block;
};
