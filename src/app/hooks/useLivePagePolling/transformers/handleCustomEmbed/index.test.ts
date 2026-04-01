import handleCustomEmbed, { CustomEmbedBlock } from '.';

const twitterCustomEmbedFixture = {
  type: 'customEmbed',
  model: {
    embedType: 'twitter',
    href: 'https://twitter.com/bbcnewspidgin/status/1700039661874282772',
  },
} as const;

const unsupportedTiktokCustomEmbedFixture = {
  type: 'customEmbed',
  model: {
    embedType: 'tiktok',
    href: 'https://tiktok.com',
  },
} as unknown as CustomEmbedBlock;

const nonCustomEmbedFixture = {
  type: 'customEmail',
  model: {
    blocks: [
      {
        type: 'fragment',
        model: {
          text: 'foo',
          attributes: ['bold'],
        },
      },
    ],
  },
};

describe('handleCustomEmbed', () => {
  it('should transfrom twitter custom embed to optimo social block', () => {
    const transformedSocialBlock = handleCustomEmbed(twitterCustomEmbedFixture);

    expect(transformedSocialBlock).toEqual({
      type: 'social',
      model: {
        source: 'https://twitter.com/bbcnewspidgin/status/1700039661874282772',
        blocks: [
          {
            type: 'renditions',
            model: {
              locator: '',
              blocks: [
                {
                  type: 'aresOEmbed',
                  model: {
                    oembed: {
                      provider_name: 'twitter',
                      url: 'https://twitter.com/bbcnewspidgin/status/1700039661874282772',
                      html: `<blockquote class="twitter-tweet"><a href="https://twitter.com/bbcnewspidgin/status/1700039661874282772">View original content on Twitter</a></blockquote>`,
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    });
  });

  it('should return post block untransformed when embed type is not twitter', () => {
    const transformedSocialBlock = handleCustomEmbed(
      unsupportedTiktokCustomEmbedFixture,
    );

    expect(transformedSocialBlock).toEqual({
      type: 'customEmbed',
      model: {
        embedType: 'tiktok',
        href: 'https://tiktok.com',
      },
    });
  });

  it('should return post block untransformed when not a custom embed type', () => {
    const transformedSocialBlock = handleCustomEmbed(nonCustomEmbedFixture);

    expect(transformedSocialBlock).toEqual({
      type: 'customEmail',
      model: {
        blocks: [
          {
            type: 'fragment',
            model: {
              text: 'foo',
              attributes: ['bold'],
            },
          },
        ],
      },
    });
  });
});
