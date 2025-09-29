import { getImageFromPost, getHeadlineFromPost } from './index';

describe('getImageFromPost', () => {
  it('returns null if no image block exists', () => {
    const post = { content: { model: { blocks: [] } } };
    expect(getImageFromPost(post as any)).toBeNull();
  });

  it('returns null if image block has no rawImage', () => {
    const post = {
      content: {
        model: {
          blocks: [
            {
              type: 'image',
              model: { blocks: [] },
            },
          ],
        },
      },
    };
    expect(getImageFromPost(post as any)).toBeNull();
  });

  it('returns image data with alt text', () => {
    const post = {
      content: {
        model: {
          blocks: [
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'rawImage',
                    model: {
                      locator: 'images/123.jpg',
                      width: 640,
                      height: 480,
                      copyrightHolder: 'BBC',
                    },
                  },
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
                                model: { text: 'Alt text here' },
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
    };
    expect(getImageFromPost(post as any)).toEqual({
      url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/123.jpg',
      altText: 'Alt text here',
      width: 640,
      height: 480,
      copyright: 'BBC',
    });
  });

  it('returns image data with empty alt text if altText block is missing', () => {
    const post = {
      content: {
        model: {
          blocks: [
            {
              type: 'image',
              model: {
                blocks: [
                  {
                    type: 'rawImage',
                    model: {
                      locator: 'images/abc.png',
                      width: 300,
                      height: 200,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    };
    expect(getImageFromPost(post as any)).toEqual({
      url: 'https://ichef.bbci.co.uk/news/300/cpsprodpb/abc.png',
      altText: '',
      width: 300,
      height: 200,
      copyright: undefined,
    });
  });
});

describe('getHeadlineFromPost', () => {
  it('returns null if no headline block exists', () => {
    const post = { header: { model: { blocks: [] } } };
    expect(getHeadlineFromPost(post as any)).toBeNull();
  });

  it('returns null if headline block has no text', () => {
    const post = {
      header: {
        model: {
          blocks: [{ type: 'headline', model: { blocks: [] } }],
        },
      },
    };
    expect(getHeadlineFromPost(post as any)).toBeNull();
  });

  it('returns the headline text if present', () => {
    const post = {
      header: {
        model: {
          blocks: [
            {
              type: 'headline',
              model: {
                blocks: [
                  {
                    type: 'text',
                    model: {
                      blocks: [
                        {
                          type: 'paragraph',
                          model: { text: 'This is the headline' },
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
    expect(getHeadlineFromPost(post as any)).toBe('This is the headline');
  });
});
