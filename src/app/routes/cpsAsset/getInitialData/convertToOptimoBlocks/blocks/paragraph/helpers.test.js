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

  it('should handle special characters for plain_text', () => {
    const input = {
      text: 'Paragraph containing special characters: &quot; &amp; &lt; &gt;',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    const expected = {
      text: 'Paragraph containing special characters: " & < >',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should not handle special characters for candy_xml', () => {
    const input = {
      text: 'Paragraph containing special characters: &quot; &amp; &lt; &gt;',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    const expected = {
      text: 'Paragraph containing special characters: &quot; &amp; &lt; &gt;',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should convert plain_text markup to candy_xml when the <link> tag is present', () => {
    const input = {
      text:
        'paragraph including link <link><caption>this is a caption</caption><url href="www.example.com" platform="highweb"/></link>',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    const expected = {
      text:
        'paragraph including link <link><caption>this is a caption</caption><url href="www.example.com" platform="highweb"/></link>',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });

  it('should convert plain_text markup to candy_xml with <link> tags in the legacy format (i.e. with attributes)', () => {
    const input = {
      text:
        '<link type="page"><caption>Desaparece en el mar Natalia Molchanova, la apneísta con más récords de la historia</caption><url href="http://www.bbc.com/mundo/noticias/2015/08/150804_deportes_desaparece_buzo_apnea_natalia_molchanova_ng" platform="highweb"/></link>',
      markupType: 'plain_text',
      type: 'paragraph',
    };

    const expected = {
      text:
        '<link type="page"><caption>Desaparece en el mar Natalia Molchanova, la apneísta con más récords de la historia</caption><url href="http://www.bbc.com/mundo/noticias/2015/08/150804_deportes_desaparece_buzo_apnea_natalia_molchanova_ng" platform="highweb"/></link>',
      markupType: 'candy_xml',
      type: 'paragraph',
    };

    expect(processBlock(input)).toEqual(expected);
  });
});
