import clone from 'ramda/src/clone';
import makeIntroductionBold from '.';

describe('makeIntroductionBold', () => {
  it('should make the introduction paragraph bold', () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'paragraph one',
            role: 'introduction',
            markupType: 'plain_text',
            type: 'paragraph',
          },
          {
            text: 'paragraph two',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
        ],
      },
    };

    const expected = clone(input);
    expected.content.blocks[0].text = '<bold>paragraph one</bold>';
    expected.content.blocks[0].markupType = 'candy_xml';

    expect(makeIntroductionBold(input)).toEqual(expected);
  });

  it('should make the introduction paragraph bold regardless of location', () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'paragraph two',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          {
            text: 'paragraph one',
            role: 'introduction',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
      },
    };

    const expected = clone(input);
    expected.content.blocks[1].text = '<bold>paragraph one</bold>';
    expected.content.blocks[1].markupType = 'candy_xml';

    expect(makeIntroductionBold(input)).toEqual(expected);
  });

  it('should make the introduction paragraph bold even if its already candy xml', () => {
    const input = {
      content: {
        blocks: [
          {
            text: '<italic>paragraph one</italic>',
            role: 'introduction',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          {
            text: 'paragraph two',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
        ],
      },
    };

    const expected = clone(input);
    expected.content.blocks[0].text = '<bold><italic>paragraph one</italic></bold>';

    expect(makeIntroductionBold(input)).toEqual(expected);
  });
});
