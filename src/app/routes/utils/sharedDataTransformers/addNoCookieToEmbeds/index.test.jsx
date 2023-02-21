import path from 'ramda/src/path';
import addNoCookiesToEmbeds from '.';

const fixture = {
  content: {
    model: {
      blocks: [
        {
          type: 'social',
          model: {
            source: 'https://www.youtube.com/watch?v=1e05_rwHvOM',
            blocks: [
              {
                type: 'renditions',
                model: {
                  locator:
                    'urn:bbc:optimo:social:d4ae3e6f-51cf-4899-bbd4-16d14882cbc7',
                  blocks: [
                    {
                      type: 'aresOEmbed',
                      model: {
                        oembed: {
                          title:
                            'Rick Astley - Never Gonna Give You Up (Official Music Video)',
                          author_name: 'Rick Astley',
                          author_url: 'https://www.youtube.com/user/BBCMundo',
                          type: 'video',
                          height: 113,
                          width: 200,
                          version: '1.0',
                          provider_name: 'YouTube',
                          provider_url: 'https://www.youtube.com/',
                          thumbnail_height: 360,
                          thumbnail_width: 480,
                          thumbnail_url:
                            'https://i.ytimg.com/vi/chiWVxreqhU/hqdefault.jpg',
                          html: '<iframe width="200" height="113" src="https://www.youtube.com/embed/1e05_rwHvOM?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                        },
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

describe('addNoCookiesToEmbeds', () => {
  it('should add No cookie to Youtube embeds', () => {
    const fixtureNoCookie = addNoCookiesToEmbeds(fixture);
    const expectedHtml = path(
      [
        'content',
        'model',
        'blocks',
        0,
        'model',
        'blocks',
        '0',
        'model',
        'blocks',
        0,
        'model',
        'oembed',
        'html',
      ],
      fixtureNoCookie,
    );
    expect(/www\.youtube-nocookie\.com/.test(expectedHtml)).toEqual(true);
  });
});
