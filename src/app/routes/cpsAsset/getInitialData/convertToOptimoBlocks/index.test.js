import loggerMock from '#testHelpers/loggerMock'; // Must be imported before convertToOptimoBlocks
import { UNSUPPORTED_BLOCK_TYPE } from '#lib/logger.const';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import { CPSMediaBlock, optimoVideoBlock } from './blocks/media/fixtures';
import { CPSVersionBlock, optimoVersionBlock } from './blocks/version/fixtures';
import {
  CPSUnorderedListBlock,
  CPSOrderedListBlock,
  optimoUnorderedListBlock,
  optimoOrderedListBlock,
} from './blocks/list/fixtures';
import includeBlockData from './blocks/include/fixtures';
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
            text: '<link><caption>this is the link text</caption><altText>this is the alt text </altText><url href="https://www.bbc.com/pidgin" platform="highweb"/><url href="https://www.bbc.com/pidgin" platform="enhancedmobile"/></link>',
            markupType: 'candy_xml',
            type: 'paragraph',
          },
          CPSMediaBlock,
          CPSVersionBlock,
          CPSUnorderedListBlock,
          CPSOrderedListBlock,
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

  it('should log info if block type is unsupported', async () => {
    const url = '/service/path/to/asset';
    const type = 'unsupported-type-name-here';
    const assetType = MEDIA_ASSET_PAGE;
    const input = {
      metadata: {
        locators: { assetUri: url },
        type: assetType,
      },
      content: {
        blocks: [
          {
            type,
          },
        ],
      },
    };

    await convertToOptimoBlocks(input);
    expect(loggerMock.info).toHaveBeenCalledWith(UNSUPPORTED_BLOCK_TYPE, {
      url,
      type,
      assetType,
    });
  });

  it('should render include blocks with correct index positions and omit non-supported/invalid includes', async () => {
    process.env.SIMORGH_INCLUDES_BASE_URL = 'https://foobar.com/includes';
    const pathname = 'https://www.bbc.com/service/foo';
    const input = includeBlockData;

    const expected = {
      content: {
        model: {
          blocks: [
            {
              model: {
                href: '/indepthtoolkit/quizzes/123-456',
                index: 0,
                isAmpSupported: false,
                type: 'idt1',
              },
              type: 'include',
            },
            {
              model: {
                href: '/idt2/111-222-333-444-555',
                imageBlock: {
                  alt: 'image alt text',
                  height: 1864,
                  layout: 'responsive',
                  src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/816',
                  srcset:
                    'https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w,https://foobar.com/includes/idt2/111-222-333-444-555/image/816 816w',
                  width: 1632,
                },
                index: 1,
                isAmpSupported: true,
                type: 'idt2',
              },
              type: 'include',
            },
            {
              model: {
                href: '/include/111-222-333-444-555',
                index: 2,
                isAmpSupported: true,
                type: 'vj',
              },
              type: 'include',
            },
            {
              model: {
                href: '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
                index: 5,
                isAmpSupported: true,
                type: 'vj',
              },
              type: 'include',
            },
            {
              model: {
                href: '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png',
                index: 6,
                isAmpSupported: true,
                type: 'vj',
              },
              type: 'include',
            },
          ],
        },
      },
    };

    expect(await convertToOptimoBlocks(input, pathname)).toEqual(expected);
  });
});
