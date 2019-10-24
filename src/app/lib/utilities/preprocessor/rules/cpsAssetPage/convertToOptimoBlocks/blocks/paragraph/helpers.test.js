import { processBlock } from './helpers';

describe('processBlock', () => {
  it('should make the introduction paragraph bold', () => {
    const input = {
      text: 'paragraph one',
      role: 'introduction',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    const expected = {
      text: '<bold>paragraph one</bold>',
      role: 'introduction',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should make the introduction paragraph bold even if its already candy xml', () => {
    const input = {
      text: '<italic>paragraph one</italic>',
      role: 'introduction',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    const expected = {
      text: '<bold><italic>paragraph one</italic></bold>',
      role: 'introduction',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should escape quotes for plain_text', () => {
    const input = {
      text: 'Paragraph containing &quot;quote marks&quot;',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    const expected = {
      text: 'Paragraph containing "quote marks"',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should escape quotes for candy_xml', () => {
    const input = {
      text: 'Paragraph containing <bold>&quot;quote marks&quot;</bold>',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    const expected = {
      text: 'Paragraph containing <bold>"quote marks"</bold>',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });
});
