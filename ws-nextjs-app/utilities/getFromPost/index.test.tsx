import { OptimoBlock } from '#models/types/optimo';
import { getImageFromPost, getHeadlineFromPost } from './index';
import { Post } from '../../pages/[service]/live/[id]/Post/types';

type OptimoBlockWithBlocks = OptimoBlock & { model: { blocks: OptimoBlock[] } };
type OptimoBlockWithText = OptimoBlock & { model: { text: string } };

describe('getImageFromPost', () => {
  it('returns null if no image block exists', () => {
    const post: Post = {
      content: { model: { blocks: [] as OptimoBlock[] } },
    } as Post;
    expect(getImageFromPost(post)).toBeNull();
  });

  it('returns null if image block has no rawImage', () => {
    const post: Post = {
      content: {
        model: {
          blocks: [
            {
              type: 'image',
              model: { blocks: [] as OptimoBlock[] },
            } as OptimoBlockWithBlocks,
          ],
        },
      },
    } as Post;
    expect(getImageFromPost(post)).toBeNull();
  });

  it('returns image data with alt text', () => {
    const post: Post = {
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
                  } as OptimoBlock,
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
                              } as OptimoBlockWithText,
                            ],
                          },
                        } as OptimoBlockWithBlocks,
                      ],
                    },
                  } as OptimoBlockWithBlocks,
                ],
              },
            } as OptimoBlockWithBlocks,
          ],
        },
      },
    } as Post;
    expect(getImageFromPost(post)).toEqual({
      url: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/images/123.jpg',
      altText: 'Alt text here',
      width: 640,
      height: 480,
      copyright: 'BBC',
    });
  });

  it('returns image data with empty alt text if altText block is missing', () => {
    const post: Post = {
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
                  } as OptimoBlock,
                ],
              },
            } as OptimoBlockWithBlocks,
          ],
        },
      },
    } as Post;
    expect(getImageFromPost(post)).toEqual({
      url: 'https://ichef.bbci.co.uk/ace/ws/300/cpsprodpb/images/abc.png',
      altText: '',
      width: 300,
      height: 200,
      copyright: undefined,
    });
  });
});

describe('getHeadlineFromPost', () => {
  it('returns null if no headline block exists', () => {
    const post: Post = {
      header: { model: { blocks: [] as OptimoBlock[] } },
    } as Post;
    expect(getHeadlineFromPost(post)).toBeNull();
  });

  it('returns null if headline block has no text', () => {
    const post: Post = {
      header: {
        model: {
          blocks: [
            {
              type: 'headline',
              model: { blocks: [] as OptimoBlock[] },
            } as OptimoBlockWithBlocks,
          ],
        },
      },
    } as Post;
    expect(getHeadlineFromPost(post)).toBeNull();
  });

  it('returns the headline text if present', () => {
    const post: Post = {
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
                        } as OptimoBlockWithText,
                      ],
                    },
                  } as OptimoBlockWithBlocks,
                ],
              },
            } as OptimoBlockWithBlocks,
          ],
        },
      },
    } as Post;
    expect(getHeadlineFromPost(post)).toBe('This is the headline');
  });
});
