import isListWithLink from '.';

const block = {
  id: '647c5ea0',
  model: {
    blocks: [
      {
        id: 'b9baac57',
        model: {
          blocks: [
            {
              id: '7620bd33',
              type: 'listItem',
              model: {
                blocks: [
                  {
                    id: 'afde08b7',
                    type: 'paragraph',
                    model: {
                      text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                      blocks: [
                        {
                          id: '45143bca',
                          type: 'urlLink',
                          model: {
                            text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                            locator:
                              'http://www.bbc.com/afaanoromoo/oduu-53249190',
                            blocks: [
                              {
                                id: 'ba212535',
                                type: 'fragment',
                                model: {
                                  text: "'Hidhamuun Miseensota Olaanoo KFO nu yaaddessa' - KFO",
                                  attributes: [],
                                },
                                position: [19, 1, 1, 1, 1, 1],
                              },
                            ],
                            isExternal: false,
                          },
                          position: [19, 1, 1, 1, 1],
                        },
                      ],
                    },
                    position: [19, 1, 1, 1],
                  },
                ],
              },
              position: [19, 1, 1],
            },
          ],
        },
        type: 'unorderedList',
        position: [19, 1],
      },
    ],
  },
  type: 'text',
  position: [19],
};

it('should work', () => {
  const actual = isListWithLink(block);

  expect(actual).toEqual(true);
});
