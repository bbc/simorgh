import isBulletedListWithLink from '#app/routes/cpsAsset/getInitialData/isBulletedListWithLink';
import addIndexToBlockGroups from '.';

const fixture = {
  content: {
    model: {
      blocks: [
        {
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
        },
      ],
    },
  },
};

describe('addIndexToBlockGroups', () => {
  it('should work', () => {
    const actual = addIndexToBlockGroups(isBulletedListWithLink)(fixture);

    expect(actual).toEqual({
      content: {
        model: {
          blocks: [
            {
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
                    indexOfBlockType: 1,
                  },
                ],
              },
              type: 'text',
            },
          ],
        },
      },
    });
  });
});
