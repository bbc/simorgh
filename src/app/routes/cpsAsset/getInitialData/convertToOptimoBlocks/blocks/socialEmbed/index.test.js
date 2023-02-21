import socialEmbed from '.';
import pageData from './fixtures';

describe('socialEmbed', () => {
  const { blocks } = pageData.content;
  const twitter = blocks[1];
  const twitterNoEmbed = blocks[3];
  const instagram = blocks[7];
  const instagramNoEmbed = blocks[8];

  it('should convert a twitter social_embed block to Optimo format', () => {
    expect(socialEmbed(twitter, pageData)).toEqual({
      model: {
        blocks: [
          {
            model: {
              embed: {
                fallback_image: {
                  alt_text:
                    'Twitter post by Miley Ray Cyrus: Australia: Due to the recommendations of local, state, federal and international government authorities, including the Center for Disease Control, to reduce potential health risks in response to the current global health crisis, we are no longer traveling to Aus for the show.',
                  fallback_image_height: 279,
                  fallback_image_width: 465,
                },
                oembed: {
                  author_name: 'Miley Ray Cyrus',
                  author_url: 'https://twitter.com/MileyCyrus',
                  cache_age: '3153600000',
                  height: null,
                  html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Australia: Due to the recommendations of local, state, federal and international government authorities, including the Center for Disease Control, to reduce potential health risks in response to the current global health crisis, we are no longer traveling to Aus for the show.</p>&mdash; Miley Ray Cyrus (@MileyCyrus) <a href="https://twitter.com/MileyCyrus/status/1237210910835392512?ref_src=twsrc%5Etfw">March 10, 2020</a></blockquote>',
                  provider_name: 'Twitter',
                  provider_url: 'https://twitter.com',
                  type: 'rich',
                  url: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
                  version: '1.0',
                  width: 550,
                },
              },
              href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
              id: '1237210910835392512',
            },
            type: 'twitter',
            indexOfType: 0,
          },
        ],
      },
      type: 'social_embed',
    });

    expect(socialEmbed(twitterNoEmbed, pageData)).toEqual({
      model: {
        blocks: [
          {
            model: {
              href: 'https://twitter.com/MileyCyrus/status/1237210910835392512',
              id: '1237210910835392512',
            },
            type: 'twitter',
            indexOfType: 1,
          },
        ],
      },
      type: 'social_embed',
    });
  });

  it('should convert an instagram social embed block to Optimo format', () => {
    expect(socialEmbed(instagram, pageData)).toEqual({
      model: {
        blocks: [
          {
            model: {
              embed: {
                fallback_image: {
                  alt_text: 'İngiltere tarihi sıcaklıklarla boğuşuyor',
                  fallback_image_height: 269,
                  fallback_image_width: 500,
                },
                oembed: {
                  author_name: 'BBC News Turkce',
                  author_url: 'https://www.instagram.com/bbcturkce/',
                  cache_age: '3153600000',
                  title: 'İngiltere tarihi sıcaklıklarla boğuşuyor',
                  html: '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CgNAEjOK46_"><p><a href="https://www.instagram.com/p/CgNAEjOK46_" style="color:#000">© 2020 Instagram</a></p></blockquote> <script async src="https://www.instagram.com/embed.js"></script>',
                  width: 480,
                  height: 270,
                  type: 'rich',
                  provider_name: 'Instagram',
                  provider_url: 'https://www.instagram.com',
                  version: '1.0',
                },
              },
              href: 'https://www.instagram.com/p/CgNAEjOK46_',
              id: 'CgNAEjOK46_',
            },
            type: 'instagram',
            indexOfType: 0,
          },
        ],
      },
      type: 'social_embed',
    });

    expect(socialEmbed(instagramNoEmbed, pageData)).toEqual({
      model: {
        blocks: [
          {
            model: {
              href: 'https://www.instagram.com/p/CgNAEjOK46_',
              id: 'CgNAEjOK46_',
            },
            type: 'instagram',
            indexOfType: 1,
          },
        ],
      },
      type: 'social_embed',
    });
  });
});
