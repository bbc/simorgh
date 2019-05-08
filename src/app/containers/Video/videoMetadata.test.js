import videoMetadata from './videoMetadata';
import { aresMediaBlock } from './fixtureData';

const noAresMediaMetadata = {
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                copyrightHolder: 'BBC',
                height: 1080,
                locator: 'ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
                originCode: null,
                width: 1920,
              },
              type: 'rawImage',
            },
            {
              model: {
                blocks: [
                  {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: {
                            text: 'Ants',
                            blocks: [
                              {
                                type: 'fragment',
                                model: {
                                  text: 'Ants',
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
              type: 'altText',
            },
          ],
        },
        type: 'image',
      },
    ],
  },
  type: 'aresMedia',
};


describe('videoMetadata', () => {
  it('returns correct video metadata', () => {
    const metadata = videoMetadata(aresMediaBlock);
    const output = {
      'video': {
        '@list': [
          {
            '@type': 'VideoObject',
            name: 'Five things ants can teach us about management',
            description: 'They may be tiny, but us humans could learn a thing or two from ants.',
            duration: 191,
            thumbnailUrl: 'https://ichef.test.bbci.co.uk/images/ic/$recipe/p01k6mtv.jpg',
          },
        ],
      },
    };
    expect(metadata).toEqual(output);
  });

  it('handles aresMediaMetadata type not being present', () => {
    const metadata = videoMetadata(noAresMediaMetadata);
    const output = { 'video': { '@list': [] } };
    expect(metadata).toEqual(output);
  })

  it('handles empty input', () => {
    const metadata = videoMetadata([]);
    expect(metadata).toEqual(undefined); 
  });
});
