import convertList from '.';

describe('convertList', () => {
  it('should convert a plain_text list to Optimo format', async () => {
    const input = {
      numbered: false,
      items: [
        {
          text: 'I am a list item',
          markupType: 'plain_text',
          type: 'listItem',
        },
        {
          text: 'I am a list item with <bold>bold</bold> text',
          markupType: 'candy_xml',
          type: 'listItem',
        },
      ],
      type: 'list',
    };

    const expectedListModel = {
      blocks: [
        {
          type: 'listItem',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'I am a list item',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'I am a list item',
                        attributes: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'listItem',
          model: {
            blocks: [
              {
                type: 'paragraph',
                model: {
                  text: 'I am a list item with bold text',
                  blocks: [
                    {
                      type: 'fragment',
                      model: {
                        text: 'I am a list item with ',
                        attributes: [],
                      },
                    },
                    {
                      type: 'fragment',
                      model: { text: 'bold', attributes: ['bold'] },
                    },
                    {
                      type: 'fragment',
                      model: { text: ' text', attributes: [] },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    };

    const expected = {
      model: {
        blocks: [
          {
            model: expectedListModel,
            type: 'unorderedList',
          },
        ],
      },
      type: 'text',
    };

    expect(await convertList(input)).toEqual(expected);
  });
});
