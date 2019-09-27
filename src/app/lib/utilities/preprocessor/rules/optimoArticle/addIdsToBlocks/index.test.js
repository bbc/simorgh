import articleJson from '#data/news/articles/c0000000003o.json';
import addIdsToBlocks from '.';

jest.mock('uuid', () => () => 'mockId');

describe('addIdsToBlocks rule', () => {
  it('should recursively add ids to blocks in article data', () => {
    const expected = {
      ...articleJson,
      content: {
        ...articleJson.content,
        model: {
          ...articleJson.content.model,
          blocks: [
            {
              id: 'mockId',
              type: 'headline',
              model: {
                blocks: [
                  {
                    id: 'mockId',
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'paragraph',
                          model: {
                            text:
                              'Lorem ipsum dolor sit amet, consectetur adipiscing elit ©',
                            blocks: [
                              {
                                id: 'mockId',
                                type: 'fragment',
                                model: {
                                  text:
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit ©',
                                  attributes: [],
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
            },
            {
              id: 'mockId',
              type: 'video',
              model: {
                locator: 'urn:bbc:pips:pid:p067gq6h',
                blocks: [
                  {
                    id: 'mockId',
                    type: 'aresMedia',
                    model: {
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'aresMediaMetadata',
                          model: {
                            id: 'p067gq6h',
                            subType: 'clip',
                            format: 'audio_video',
                            title: 'Mark and Isla Royal Wedding',
                            synopses: {
                              short:
                                'Stop the press! It’s a Mark and Isla Royal Wedding special…',
                              medium: null,
                              long: null,
                            },
                            imageUrl:
                              'ichef.bbci.co.uk/images/ic/$recipe/p067grwg.jpg',
                            embedding: true,
                            warnings: {},
                            advertising: false,
                            versions: [
                              {
                                versionId: 'p067gq6k',
                                types: ['Original'],
                                duration: 94,
                                availableTerritories: {
                                  uk: true,
                                  nonUk: false,
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: 'mockId',
                    type: 'caption',
                    model: {
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'text',
                          model: {
                            blocks: [
                              {
                                id: 'mockId',
                                type: 'paragraph',
                                model: {
                                  text:
                                    'Duis vitae ipsum hendrerit, commodo metus vel, mattis sapien. Proin eleifend vulputate porta. Curabitur mollis nunc nec felis ultricies, vitae tempor metus imperdiet.',
                                  blocks: [
                                    {
                                      id: 'mockId',
                                      type: 'fragment',
                                      model: {
                                        text:
                                          'Duis vitae ipsum hendrerit, commodo metus vel, mattis sapien. Proin eleifend vulputate porta. Curabitur mollis nunc nec felis ultricies, vitae tempor metus imperdiet.',
                                        attributes: [],
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
                  },
                ],
              },
            },
            {
              id: 'mockId',
              type: 'text',
              model: {
                blocks: [
                  {
                    id: 'mockId',
                    type: 'paragraph',
                    model: {
                      text:
                        'Donec ut fermentum risus, eu sodales mauris. Quisque vitae est sed nisl tincidunt facilisis.Nec vulputate metus sagittis.',
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'fragment',
                          model: {
                            text:
                              'Donec ut fermentum risus, eu sodales mauris. Quisque vitae est sed nisl tincidunt facilisis.Nec vulputate metus sagittis.',
                            attributes: [],
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: 'mockId',
                    type: 'paragraph',
                    model: {
                      text:
                        'Quisque quis libero H2O bibendum, feugiat felis ut, dignissim tortor.',
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'fragment',
                          model: {
                            text:
                              'Quisque quis libero H²0 bibendum, feugiat felis ut, dignissim tortor.',
                            attributes: [],
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: 'mockId',
                    type: 'paragraph',
                    model: {
                      text:
                        'Mauris metus lectus, lacinia sit amet massa ut, interdum convallis ipsum.',
                      blocks: [
                        {
                          id: 'mockId',
                          type: 'fragment',
                          model: {
                            text:
                              'Mauris metus lectus, lacinia sit amet massa ut, interdum convallis ipsum.',
                            attributes: [],
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
      },
    };
    const actual = addIdsToBlocks(articleJson);

    expect(actual).toEqual(expected);
  });
});
