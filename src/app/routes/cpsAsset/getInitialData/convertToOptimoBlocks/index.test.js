import { CPSMediaBlock, optimoVideoBlock } from './blocks/media/fixtures';
import {
  legacyMediaBlock,
  legacyOptimoVideoBlock,
} from './blocks/legacyMedia/fixtures';
import { CPSVersionBlock, optimoVersionBlock } from './blocks/version/fixtures';
import {
  CPSUnorderedListBlock,
  CPSOrderedListBlock,
  optimoUnorderedListBlock,
  optimoOrderedListBlock,
} from './blocks/list/fixtures';
import convertToOptimoBlocks from '.';
import { optimoTextWithParagraph, optimoSubheadline } from './utils/helpers';

describe('convertToOptimoBlocks', () => {
  it('should convert CPS data into Optimo format', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>bold text</bold>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          {
            text: 'A plain text paragraph',
            markupType: 'plain_text',
            type: 'paragraph',
          },
          {
            text:
              '<link><caption>this is the link text</caption><altText>this is the alt text </altText><url href="https://www.bbc.com/pidgin" platform="highweb"/><url href="https://www.bbc.com/pidgin" platform="enhancedmobile"/></link>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          CPSMediaBlock,
          CPSVersionBlock,
          CPSUnorderedListBlock,
          CPSOrderedListBlock,
          legacyMediaBlock,
        ],
      },
    };

    const expected = {
      content: {
        model: {
          blocks: [
            optimoTextWithParagraph([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing ',
                    attributes: [],
                  },
                  {
                    fragment: 'bold text',
                    attributes: ['bold'],
                  },
                ],
                text: 'Paragraph containing bold text',
              },
            ]),
            optimoTextWithParagraph([
              {
                fragments: [
                  {
                    fragment: 'A plain text paragraph',
                    attributes: [],
                  },
                ],
                text: 'A plain text paragraph',
              },
            ]),
            {
              type: 'text',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: 'this is the link text',
                      blocks: [
                        {
                          type: 'urlLink',
                          model: {
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  attributes: [],
                                  text: 'this is the link text',
                                },
                              },
                            ],
                            isExternal: false,
                            locator: 'https://www.bbc.com/pidgin',
                            text: 'this is the link text',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            optimoVideoBlock,
            optimoVersionBlock,
            optimoUnorderedListBlock,
            optimoOrderedListBlock,
            legacyOptimoVideoBlock,
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should handle escaped quotes in a plain_text block', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing &quot;quote marks&quot;',
            markupType: 'plain_text',
            type: 'paragraph',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [
            optimoTextWithParagraph([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing "quote marks"',
                    attributes: [],
                  },
                ],
                text: 'Paragraph containing "quote marks"',
              },
            ]),
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should handle escaped quotes in a candy_xml block', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>&quot;quote marks&quot;</bold>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [
            optimoTextWithParagraph([
              {
                fragments: [
                  {
                    fragment: 'Paragraph containing ',
                    attributes: [],
                  },
                  {
                    fragment: '"quote marks"',
                    attributes: ['bold'],
                  },
                ],
                text: 'Paragraph containing "quote marks"',
              },
            ]),
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if blocks is an empty array', async () => {
    const input = {
      content: {
        blocks: [],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should return an empty array if block does not have a type', async () => {
    const input = {
      content: {
        blocks: [
          {
            text: 'Paragraph containing <bold>bold text</bold>',
            markupType: 'candy_xml',
          },
        ],
      },
    };
    const expected = {
      content: {
        model: {
          blocks: [],
        },
      },
    };

    expect(await convertToOptimoBlocks(input)).toEqual(expected);
  });

  it('should make the introduction paragraph bold', async () => {
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

    const output = await convertToOptimoBlocks(input);

    expect(
      output.content.model.blocks[1].model.blocks[0].model.blocks[0].model
        .attributes,
    ).toEqual(['bold']);
  });

  ['crosshead', 'heading', 'subheading'].forEach(type => {
    it(`should convert a plain_text ${type} to Optimo format`, async () => {
      const input = {
        content: {
          blocks: [
            {
              text: 'A plain text block',
              markupType: 'plain_text',
              type,
            },
          ],
        },
      };

      const expected = {
        content: {
          model: {
            blocks: [
              optimoSubheadline([
                {
                  fragments: [
                    {
                      fragment: 'A plain text block',
                      attributes: [],
                    },
                  ],
                  text: 'A plain text block',
                },
              ]),
            ],
          },
        },
      };

      expect(await convertToOptimoBlocks(input)).toEqual(expected);
    });
  });
});
