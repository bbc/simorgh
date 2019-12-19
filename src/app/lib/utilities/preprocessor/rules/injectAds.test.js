import articleJson from '#data/news/articles/c0g992jmmkko.json';
import injectAds from './injectAds';

describe('injectAds rule', () => {
  it('should inject ads', () => {
    const expected = {
      ...articleJson,
      content: {
        ...articleJson.content,
        model: {
          ...articleJson.content.model,
          blocks: [
            articleJson.content.model.blocks[0],
            articleJson.content.model.blocks[1],
            {
              model: {
                blocks: [
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              'Patients at an east London hospice were "thrilled" to be handed bouquets of flowers from the royal wedding of Prince Harry and Meghan Markle.',
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        'Patients at an east London hospice were "thrilled" to be handed bouquets of flowers from the royal wedding of Prince Harry and Meghan Markle.',
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              "The flowers, which had adorned St George's Chapel at Windsor Castle, were delivered to St Joseph's Hospice in Hackney on Sunday.",
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        "The flowers, which had adorned St George's Chapel at Windsor Castle, were delivered to St Joseph's Hospice in Hackney on Sunday.",
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              'Designed by Philippa Craddock, the flowers were hand-tied into bouquets for the hospice residents.',
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        'Designed by Philippa Craddock, the flowers were hand-tied into bouquets for the hospice residents.',
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text: "Meghan's own bouquet was ",
                          },
                          type: 'fragment',
                        },
                        {
                          model: {
                            blocks: [
                              {
                                model: {
                                  attributes: [],
                                  text:
                                    'placed on the tomb of the unknown warrior',
                                },
                                type: 'fragment',
                              },
                            ],
                            isExternal: false,
                            locator:
                              'https://www.test.bbc.com/news/articles/c6v11qzyv8po',
                            text: 'placed on the tomb of the unknown warrior',
                          },
                          type: 'urlLink',
                        },
                        {
                          model: {
                            attributes: [],
                            text:
                              ' at Westminster Abbey, following royal tradition.',
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        "Meghan's own bouquet was placed on the tomb of the unknown warrior at Westminster Abbey, following royal tradition.",
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      attributes: [],
                      text: '',
                    },
                    type: 'ad',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              '"We are so honoured to receive this wonderful gift," the hospice said.',
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        '"We are so honoured to receive this wonderful gift," the hospice said.',
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              "Respite patient Pauline Clayton, 89, was especially pleased with the gift. At the age of 19 she worked for royal dressmaker Norman Hartnell and helped to embroider the 15ft (4.5m) Botticelli-inspired train of Queen Elizabeth II's wedding dress.",
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        "Respite patient Pauline Clayton, 89, was especially pleased with the gift. At the age of 19 she worked for royal dressmaker Norman Hartnell and helped to embroider the 15ft (4.5m) Botticelli-inspired train of Queen Elizabeth II's wedding dress.",
                    },
                    type: 'paragraph',
                  },
                ],
              },
              type: 'text',
            },
            articleJson.content.model.blocks[3],
            articleJson.content.model.blocks[4],
            articleJson.content.model.blocks[5],
            articleJson.content.model.blocks[6],
            {
              model: {
                blocks: [
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              '"I really liked working for the Queen Mother and I helped to make many of her dresses during my 20-year career with Norman Hartnell.',
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        '"I really liked working for the Queen Mother and I helped to make many of her dresses during my 20-year career with Norman Hartnell.',
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text:
                              "\"With my royal connections it's such a lovely coincidence to be at St Joseph's and receive these wedding flowers.",
                          },
                          type: 'fragment',
                        },
                      ],
                      text:
                        "\"With my royal connections it's such a lovely coincidence to be at St Joseph's and receive these wedding flowers.",
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      blocks: [
                        {
                          model: {
                            attributes: [],
                            text: '"They are beautiful and very special."',
                          },
                          type: 'fragment',
                        },
                      ],
                      text: '"They are beautiful and very special."',
                    },
                    type: 'paragraph',
                  },
                  {
                    model: {
                      attributes: [],
                      text: '',
                    },
                    type: 'ad',
                  },
                ],
              },
              type: 'text',
            },
            articleJson.content.model.blocks[8],
            articleJson.content.model.blocks[9],
          ],
        },
      },
    };

    const actual = injectAds(articleJson);
    expect(actual).toStrictEqual(expected);
  });
});
