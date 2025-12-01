const recommendationsFixtures = [
  {
    id: '123',
    title: 'Recommendation One',
    image: {
      width: 1824,
      height: 1026,
      altText: 'image of something too',
      locator: 'a095/live/9c11d5e0-0581-11f0-88b7-5556e7b55c5e.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Getty Images',
    },
    href: 'https://www.bbc.co.uk',
  },
  {
    id: '456',
    title: 'Recommendation Two',
    image: {
      width: 1824,
      height: 1026,
      altText: 'images of something',
      locator: 'b491/live/4ee8f370-0c4d-11f0-8c95-199dc1dd8dea.jpg',
      originCode: 'cpsprodpb',
      copyrightHolder: 'Getty Images',
    },
    href: 'https://www.bbc.co.uk',
  },
];

export const topStoriesContentFixture = [
  {
    id: 'urn:bbc:ares::article:c3d05pkxee3o',
    locators: {
      canonicalUrl: 'https://www.bbc.com/mundo/articles/c3d05pkxee3o',
    },
    headlines: {
      promoHeadline: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: '"Si mi hermana no estuviera allá, con gusto te hablaría": el miedo de los venezolanos en EE.UU. a opinar sobre la amenaza militar de Trump ',
                    blocks: [
                      {
                        type: 'fragment',
                        model: {
                          text: '"Si mi hermana no estuviera allá, con gusto te hablaría": el miedo de los venezolanos en EE.UU. a opinar sobre la amenaza militar de Trump ',
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
    images: {
      defaultPromoImage: {
        blocks: [
          {
            type: 'altText',
            model: {
              blocks: [
                {
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        model: {
                          text: 'alt text',
                          blocks: [
                            {
                              type: 'fragment',
                              model: {
                                text: 'alt text',
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
            type: 'rawImage',
            model: {
              width: 880,
              height: 495,
              locator: 'bbf5/live/b4da0380-cc97-11f0-81ab-2d2febf9fb8f.jpg',
              originCode: 'cpsprodpb',
              copyrightHolder: 'Getty Images',
              suitableForSyndication: true,
            },
          },
        ],
      },
    },
  },
  {
    id: 'urn:bbc:ares::article:cgkemkrz18po',
    locators: {
      canonicalUrl: 'https://www.bbc.com/mundo/articles/cgkemkrz18po',
    },
    headlines: {
      promoHeadline: {
        blocks: [
          {
            type: 'text',
            model: {
              blocks: [
                {
                  type: 'paragraph',
                  model: {
                    text: '"EE.UU. pretende apoderarse de las vastas reservas de petróleo de Venezuela": la carta que Maduro le envió a la OPEP denunciando la amenaza militar de Washington',
                    blocks: [
                      {
                        type: 'fragment',
                        model: {
                          text: '"EE.UU. pretende apoderarse de las vastas reservas de petróleo de Venezuela": la carta que Maduro le envió a la OPEP denunciando la amenaza militar de Washington',
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
    images: {
      defaultPromoImage: {
        blocks: [
          {
            type: 'altText',
            model: {
              blocks: [
                {
                  type: 'text',
                  model: {
                    blocks: [
                      {
                        type: 'paragraph',
                        model: {
                          text: '"EE.UU. pretende apoderarse de las vastas reservas de petróleo de Venezuela": la carta que Maduro le envió a la OPEP denunciando la amenaza militar de Washington',
                          blocks: [
                            {
                              type: 'fragment',
                              model: {
                                text: '"EE.UU. pretende apoderarse de las vastas reservas de petróleo de Venezuela": la carta que Maduro le envió a la OPEP denunciando la amenaza militar de Washington',
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
            type: 'rawImage',
            model: {
              width: 1008,
              height: 567,
              locator: '9a5d/live/4c52d9c0-cea1-11f0-a58d-8f327674649c.jpg',
              originCode: 'cpsprodpb',
              copyrightHolder: 'Getty Images',
              suitableForSyndication: true,
            },
          },
        ],
      },
    },
  },
];

export default recommendationsFixtures;
