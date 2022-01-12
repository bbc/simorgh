import isListWithLink from '.';

const block = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              type: 'listItem',
              model: {
                blocks: [
                  {
                    type: 'paragraph',
                    model: {
                      text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                      blocks: [
                        {
                          type: 'urlLink',
                          model: {
                            text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                            locator:
                              'http://www.bbc.com/afaanoromoo/oduu-53249190',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                                  attributes: [],
                                },
                              },
                            ],
                            isExternal: false,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
        type: 'unorderedList',
      },
    ],
  },
  type: 'text',
};

it('should work', () => {
  const actual = isListWithLink(block);

  expect(actual).toEqual(true);
});
